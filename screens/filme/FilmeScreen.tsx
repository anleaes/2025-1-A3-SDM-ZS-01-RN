// src/screens/filme/FilmeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Filme = {
  id: number;
  titulo: string;
  diretor: string;
  data_lancamento: string;
  generos_details: { id: number; nome: string }[];
};

const FilmeScreen = ({ navigation }: any) => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFilmes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/filmes/');
      setFilmes(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os filmes.' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchFilmes(); }, []));

  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este filme?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', onPress: async () => {
          try {
            await api.delete(`/filmes/${id}/`);
            setFilmes(prev => prev.filter(f => f.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o filme. ' + error);
          }
        }, style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: Filme }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.titulo}</Text>
        <Text style={styles.description}>Diretor: {item.diretor}</Text>
        <Text style={styles.description}>
          Gêneros: {item.generos_details.map(g => g.nome).join(', ')}
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditFilme', { filmeId: item.id })}>
          <Ionicons name="pencil" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateFilme')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1c1c1e' },
    fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#3498db', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
    card: { backgroundColor: '#2c2c2e', marginVertical: 8, marginHorizontal: 16, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardContent: { flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    description: { fontSize: 14, color: '#ccc', marginTop: 4 },
    cardActions: { flexDirection: 'row', gap: 16 }
});

export default FilmeScreen;