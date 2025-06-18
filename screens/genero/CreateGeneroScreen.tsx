import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

const CreateGeneroScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState(''); // 
  const [descricao, setDescricao] = useState(''); // 
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!nome) {
      Alert.alert('Erro', 'O nome do gênero é obrigatório.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/generos/', { nome, descricao }); // 
      navigation.goBack(); // 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o gênero. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Gênero</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 100 }]} value={descricao} onChangeText={setDescricao} multiline />
      {saving ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#3498db" />
      )}
    </View>
  );
};
// Estilos... (Adicione os estilos abaixo)
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 12 }, // 
});

export default CreateGeneroScreen;