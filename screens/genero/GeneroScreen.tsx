import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Genero = {
  id: number;
  nome: string;
  descricao: string;
};

const GeneroScreen = ({ navigation }: any) => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGeneros = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/generos/');
      setGeneros(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os gêneros. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchGeneros(); }, [])); 

  const handleDelete = async (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este gênero?', [
      { text: 'Cancelar' },
      { text: 'Excluir', onPress: async () => {
          try {
            await api.delete(`/generos/${id}/`); 
            setGeneros(prev => prev.filter(g => g.id !== id)); 
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o gênero. ' + error);
          }
        }, style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: Genero }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.description}>{item.descricao}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditGenero', { genero: item })}>
          <Ionicons name="pencil" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={generos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateGenero')}>
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

export default GeneroScreen;

