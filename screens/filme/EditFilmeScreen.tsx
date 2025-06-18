import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';
import { Filme } from './FilmeScreen';

const EditFilmeScreen = ({ route, navigation }: any) => {
  const { filme } = route.params as { filme: Filme };

  const [titulo, setTitulo] = useState('');
  const [diretor, setDiretor] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [generos, setGeneros] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (filme) {
      setTitulo(filme.titulo);
      setDiretor(filme.diretor);
      setDataLancamento(filme.data_lancamento || '');
      setDescricao(filme.descricao || '');
      setDuracao(filme.duracao || '');
      setGeneros(filme.generos?.join(', ') || '');
    }
  }, [filme]);

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
      await api.put(`/filmes/${filme.id}/`, filmeData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o filme. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
     <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />
      <Text style={styles.label}>Diretor</Text>
      <TextInput style={styles.input} value={diretor} onChangeText={setDiretor} />
      <Text style={styles.label}>Data de Lançamento (AAAA-MM-DD)</Text>
      <TextInput style={styles.input} value={dataLancamento} onChangeText={setDataLancamento} />
      <Text style={styles.label}>Duração (HH:MM:SS)</Text>
      <TextInput style={styles.input} value={duracao} onChangeText={setDuracao} />
      <Text style={styles.label}>IDs dos Gêneros (separados por vírgula)</Text>
      <TextInput style={styles.input} value={generos} onChangeText={setGeneros} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} value={descricao} onChangeText={setDescricao} multiline />
      <View style={styles.buttonContainer}>
        {!saving ? (
            <Button title="Salvar Alterações" onPress={handleSave} color="#3498db" />
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

export default EditFilmeScreen;