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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1c1c1e' // 1. Fundo escuro para combinar com o tema
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4,
        color: '#FFFFFF' // 2. Cor da label alterada para branco
    },
    input: {
        borderWidth: 1,
        borderColor: '#555', // Borda um pouco mais clara para ser visível
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        color: '#FFFFFF' // 3. Cor do texto DENTRO do input
    },
});

export default CreateGeneroScreen;