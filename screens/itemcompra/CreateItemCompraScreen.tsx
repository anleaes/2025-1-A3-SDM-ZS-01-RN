import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';
import { Compra } from '../compra/CompraScreen';
import { Ingresso } from '../ingresso/IngressoScreen';

const CreateItemCompraScreen = ({ navigation }: any) => {
  const [compraId, setCompraId] = useState<number>();
  const [ingressoId, setIngressoId] = useState<number>();
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [quantidade, setQuantidade] = useState('1');

  const [allCompras, setAllCompras] = useState<Compra[]>([]);
  const [allIngressos, setAllIngressos] = useState<Ingresso[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/compras/').then(response => setAllCompras(response.data));
    api.get('/ingressos/').then(response => setAllIngressos(response.data));
  }, []);

  const handleSave = async () => {
    if (!compraId || !ingressoId || !precoUnitario || !quantidade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const itemData = { 
      compra: compraId, 
      ingresso: ingressoId, 
      preco_unitario: precoUnitario,
      quantidade: parseInt(quantidade)
    };

    try {
      await api.post('/itens_compra/', itemData);
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : 'Não foi possível salvar o item.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Compra</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={compraId} onValueChange={setCompraId} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione a compra..." value={undefined} />
          {allCompras.map(compra => <Picker.Item key={compra.id} label={`Compra #${compra.id} - ${compra.usuario_nome}`} value={compra.id} /> )}
        </Picker>
      </View>

      <Text style={styles.label}>Ingresso</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={ingressoId} onValueChange={setIngressoId} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione o ingresso..." value={undefined} />
          {allIngressos.map(ing => (
            <Picker.Item key={ing.id} label={`Ingresso Cód: ${ing.id}`} value={ing.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="1" placeholderTextColor="#999" keyboardType="numeric" />
      
      <Text style={styles.label}>Preço Unitário</Text>
      <TextInput style={styles.input} value={precoUnitario} onChangeText={setPrecoUnitario} placeholder="Ex: 30.50" placeholderTextColor="#999" keyboardType="decimal-pad" />
      
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
    pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginBottom: 12, },
    picker: { color: '#fff', height: 50, },
});

export default CreateItemCompraScreen;