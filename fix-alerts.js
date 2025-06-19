// Salve como fix-alerts.js na raiz do projeto
const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Troca Alert.alert('Mensagem') ou Alert.alert("Mensagem") por window.alert('Mensagem')
  content = content.replace(/Alert\.alert\((['"`])(.*?)\1\)/g, 'window.alert($1$2$1)');

  // Troca Alert.alert('Título', 'Mensagem') por window.alert('Título\\nMensagem')
  content = content.replace(/Alert\.alert\((['"`])(.*?)\1\s*,\s*(['"`])(.*?)\3\)/g, 'window.alert($1$2\\n$4$1)');

  // Troca Alert.alert('Confirmação', 'Mensagem', ...) por window.confirm('Mensagem')
  content = content.replace(/Alert\.alert\((['"`])(.*?)\1\s*,\s*(['"`])(.*?)\3\s*,\s*\[/g, 'window.confirm($3$4$3) && (');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  });
}

walk('./screens');
console.log('Substituição de Alert concluída!');