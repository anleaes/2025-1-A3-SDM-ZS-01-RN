import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Sessao = {
  id: number;
  filme: string;
  filme_id?: number; 
  sala: number;
  horario: string;
  is_active: boolean;
};

const SessaoScreen = ({ navigation }: any) => {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessoes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/sessoes/');
      setSessoes(data);
    } catch (error) {
      window.alert('Erro ' + ' Não foi possível carregar as sessões. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchSessoes(); }, []));

  const handleDelete = (id: number) => {
  if (window.confirm('Deseja realmente excluir esta Sessao?')) {
    (async () => {
      try {
        await api.delete(`/sessoes/${id}/`);
        setSessoes(prev => prev.filter(i => i.id !== id));
        window.alert('Sessao excluída com sucesso!');
      } catch (error) {
        window.alert('Não foi possível excluir a Sessao. ' + error);
      }
    })();
  }
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: Sessao }) => (
    <View style={[styles.card, !item.is_active && styles.cardInactive]}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.filme}</Text>
        <Text style={styles.details}>Sala {item.sala} - {formatDateTime(item.horario)}</Text>
        <Text style={[styles.details, { color: item.is_active ? '#2ecc71' : '#e74c3c' }]}>
          {item.is_active ? 'Ativa' : 'Inativa'}
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditSessao', { sessao: item })}>
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
          data={sessoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateSessao')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#3498db', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
    card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333' },
    cardInactive: { borderColor: '#e74c3c', opacity: 0.7 },
    cardContent: { flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    details: { fontSize: 14, color: '#aaa', marginTop: 4 },
    cardActions: { flexDirection: 'row', gap: 16 }
});

export default SessaoScreen;