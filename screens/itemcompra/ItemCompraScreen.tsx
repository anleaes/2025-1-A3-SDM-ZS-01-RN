import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type ItemCompra = {
  id: number;
  preco_unitario: string;
  quantidade: number; 
  compra: number;
  ingresso: number;
  compra_details: string;
  ingresso_details: string;
};

const ItemCompraScreen = ({ navigation }: any) => {
  const [itens, setItens] = useState<ItemCompra[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItens = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/itens_compra/');
      setItens(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os itens. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchItens(); }, []));

  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este item?', [
      { text: 'Cancelar' },
      { text: 'Excluir', onPress: async () => {
          try {
            await api.delete(`/itens_compra/${id}/`);
            setItens(prev => prev.filter(i => i.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o item. ' + error);
          }
        }, style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: ItemCompra }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>Item da {item.compra_details}</Text>
        <Text style={styles.details}>Ingresso: {item.ingresso_details}</Text>
        <Text style={styles.details}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.price}>Preço Unitário: R$ {item.preco_unitario}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditItemCompra', { itemCompraId: item.id })}>
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
        <FlatList data={itens} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateItemCompra')}>
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

export default ItemCompraScreen;