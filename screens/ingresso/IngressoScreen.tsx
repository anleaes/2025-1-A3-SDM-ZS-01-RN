
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Ingresso = {
  id: number;
  preco: string;
  sessao: number;
  cadeira: number; 
  sessao_details: string;  
  cadeira_details: string; 
};

const IngressoScreen = ({ navigation }: any) => {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIngressos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/ingressos/');
      setIngressos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ingressos. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchIngressos(); }, []));

  const handleDelete = (id: number) => {
  if (window.confirm('Deseja realmente excluir este ingresso?')) {
    (async () => {
      try {
        await api.delete(`/ingressos/${id}/`);
        setIngressos(prev => prev.filter(i => i.id !== id));
        window.alert('Ingresso excluído com sucesso!');
      } catch (error) {
        window.alert('Não foi possível excluir o ingresso. ' + error);
      }
    })();
  }
  };

  const renderItem = ({ item }: { item: Ingresso }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>Ingresso Cód: {item.id}</Text>
        <Text style={styles.details}>{item.sessao_details}</Text>
        <Text style={styles.details}>Assento: {item.cadeira_details}</Text>
        <Text style={styles.price}>Preço: R$ {item.preco}</Text>
      </View>
      <View style={styles.cardActions}>

        <TouchableOpacity onPress={() => navigation.navigate('EditIngresso', { ingresso: item })}>
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
          data={ingressos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateIngresso')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#3498db', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
    card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333' },
    cardContent: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    details: { fontSize: 14, color: '#aaa', marginTop: 2 },
    price: { fontSize: 14, color: '#2ecc71', marginTop: 8, fontWeight: 'bold' },
    cardActions: { flexDirection: 'row', gap: 16 }
});

export default IngressoScreen;