import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../services/api';


type Genero = {
  id: number;
  nome: string;
};

const CreateFilmeScreen = ({ navigation }: any) => {
  const [titulo, setTitulo] = useState('');
  const [diretor, setDiretor] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [allGenres, setAllGenres] = useState<Genero[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get('/generos/');
        setAllGenres(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a lista de gêneros. ' + error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenres(prevSelected =>
      prevSelected.includes(genreId)
        ? prevSelected.filter(id => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  const handleSave = async () => {
    if (!titulo || !diretor) {
      Alert.alert('Erro', 'Título e Diretor são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const filmeData = {
        titulo,
        diretor,
        data_lancamento: dataLancamento,
        descricao,
        duracao,
        generos: selectedGenres, 
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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título do Filme" placeholderTextColor="#999" />

      <Text style={styles.label}>Diretor</Text>
      <TextInput style={styles.input} value={diretor} onChangeText={setDiretor} placeholder="Nome do Diretor" placeholderTextColor="#999" />
      
      <Text style={styles.label}>Data de Lançamento (AAAA-MM-DD)</Text>
      <TextInput style={styles.input} value={dataLancamento} onChangeText={setDataLancamento} placeholder="AAAA-MM-DD" placeholderTextColor="#999" />

      <Text style={styles.label}>Duração (HH:MM:SS)</Text>
      <TextInput style={styles.input} value={duracao} onChangeText={setDuracao} placeholder="HH:MM:SS" placeholderTextColor="#999" />


      <Text style={styles.label}>Gêneros</Text>
      <View style={styles.genreContainer}>
        {allGenres.map(genre => {
          const isSelected = selectedGenres.includes(genre.id);
          return (
            <TouchableOpacity
              key={genre.id}
              style={[styles.genreButton, isSelected && styles.genreButtonSelected]}
              onPress={() => handleGenreSelect(genre.id)}
            >
              <Text style={[styles.genreText, isSelected && styles.genreTextSelected]}>{genre.nome}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} value={descricao} onChangeText={setDescricao} multiline placeholder="Sinopse do filme..." placeholderTextColor="#999" />
      
      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar" onPress={handleSave} color="#3498db" />}
        {saving && <ActivityIndicator size="large" color="#3498db" />}
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
    genreContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
    genreButton: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#333', borderRadius: 20, marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#555' },
    genreButtonSelected: { backgroundColor: '#3498db', borderColor: '#3498db' },
    genreText: { color: '#fff', fontSize: 14 },
    genreTextSelected: { fontWeight: 'bold' }
});

export default CreateFilmeScreen;