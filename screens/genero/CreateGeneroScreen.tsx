
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import api from '../../services/api';

const CreateGeneroScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!nome) {
      window.alert('Erro ' + ' O nome do gênero é obrigatório.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/generos/', { nome, descricao });
      navigation.goBack();
    } catch (error) {
      window.alert('Erro ' + 'Não foi possível salvar o gênero. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Gênero</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Ação"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        placeholder="Descreva o gênero..."
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        {!saving && (
          <Button title="Salvar" onPress={handleSave} color="#3498db" />
        )}
        
        {saving && <ActivityIndicator size="large" color="#3498db" />}

        <View style={{ marginTop: 10 }}>
          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            color="#888"
            disabled={saving}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1c1c1e',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateGeneroScreen;