import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import api from '../../services/api';

const CreateUsuarioScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!nome || !email || !cpf) {
      Alert.alert('Erro', 'Nome, Email e CPF são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const usuarioData = {
        nome,
        email,
        cpf,
        data_nascimento: dataNascimento || null, // Envia null se o campo estiver vazio
    };

    try {
      await api.post('/usuarios/', usuarioData);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do Usuário" placeholderTextColor="#999" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="email@exemplo.com" placeholderTextColor="#999" keyboardType="email-address" />
      
      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Data de Nascimento (Opcional)</Text>
      {/* Para uma melhor experiência, considere usar uma biblioteca de DatePicker */}
      <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} placeholder="AAAA-MM-DD" placeholderTextColor="#999" />
      
      <View style={styles.buttonContainer}>
        {!saving ? (
            <Button title="Salvar" onPress={handleSave} color="#3498db" />
        ) : (
            <ActivityIndicator size="large" color="#3498db" />
        )}
        <View style={{ marginTop: 10 }}>
            <Button title="Voltar" onPress={() => navigation.goBack()} color="#888" disabled={saving}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#1c1c1e' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#FFFFFF' },
    input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
    buttonContainer: { marginTop: 20, marginBottom: 40 },
});

export default CreateUsuarioScreen;