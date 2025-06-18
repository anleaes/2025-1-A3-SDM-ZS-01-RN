import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

const CreateFilmeScreen = ({ navigation }: any) => {
  const [titulo, setTitulo] = useState('');
  const [diretor, setDiretor] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [generos, setGeneros] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!titulo || !diretor) {
      Alert.alert('Erro', 'Título e Diretor são obrigatórios.');
      return;
    }
    setSaving(true);

    const generosArray = generos.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    
    const filmeData = {
        titulo,
        diretor,
        data_lancamento: dataLancamento,
        descricao,
        duracao,
        generos: generosArray
    };

    try {
      await api.post('/filmes/', filmeData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o filme.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título do Filme" placeholderTextColor="#999" />

      <Text style={styles.label}>Diretor</Text>
      <TextInput style={styles.input} value={diretor} onChangeText={setDiretor} placeholder="Nome do Diretor" placeholderTextColor="#999" />
      
      <Text style={styles.label}>Data de Lançamento</Text>
      <TextInput style={styles.input} value={dataLancamento} onChangeText={setDataLancamento} placeholder="AAAA-MM-DD" placeholderTextColor="#999" />

      <Text style={styles.label}>Duração</Text>
      <TextInput style={styles.input} value={duracao} onChangeText={setDuracao} placeholder="HH:MM:SS" placeholderTextColor="#999" />

      <Text style={styles.label}>IDs dos Gêneros (separados por vírgula)</Text>
      <TextInput style={styles.input} value={generos} onChangeText={setGeneros} placeholder="Ex: 1, 2, 5" placeholderTextColor="#999" />
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} value={descricao} onChangeText={setDescricao} multiline placeholder="Sinopse do filme..." placeholderTextColor="#999" />
      
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

export default CreateFilmeScreen;