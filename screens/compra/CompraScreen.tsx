import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Compra = {
  id: number;
  data: string;
  valor_total: string;
  usuario: number; 
  usuario_nome: string;
};

const CompraScreen = ({ navigation }: any) => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompras = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/compras/');
      setCompras(data);
    } catch (error) {
      window.alert('Erro ' + 'Não foi possível carregar as compras. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchCompras(); }, []));

  const handleDelete = (id: number) => {
  if (window.confirm('Deseja realmente excluir esta Compra?')) {
    (async () => {
      try {
        await api.delete(`/compras/${id}/`);
        setCompras(prev => prev.filter(i => i.id !== id));
        window.alert('Compra excluída com sucesso!');
      } catch (error) {
        window.alert('Não foi possível excluir a Compra. ' + error);
      }
    })();
  }
  };

  const renderItem = ({ item }: { item: Compra }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>Compra #{item.id} - {item.usuario_nome}</Text>
        <Text style={styles.details}>Data: {new Date(item.data).toLocaleDateString('pt-BR')}</Text>
        <Text style={styles.price}>Valor: R$ {item.valor_total}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCompra', { compraId: item.id })}>
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
      {loading ? <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} /> : (
        <FlatList data={compras} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateCompra')}>
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
    name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    details: { fontSize: 14, color: '#aaa', marginTop: 4 },
    price: { fontSize: 14, color: '#2ecc71', marginTop: 8, fontWeight: 'bold' },
    cardActions: { flexDirection: 'row', gap: 16 }
});

export default CompraScreen;