import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';
import { Usuario } from '../usuario/UsuarioScreen';

const CreateCompraScreen = ({ navigation }: any) => {
  const [usuarioId, setUsuarioId] = useState<number>();
  const [valorTotal, setValorTotal] = useState('');
  const [allUsuarios, setAllUsuarios] = useState<Usuario[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/usuarios/').then(response => setAllUsuarios(response.data));
  }, []);

  const handleSave = async () => {
    if (!usuarioId || !valorTotal) {
      window.alert('Erro ' + 'Usuário e Valor Total são obrigatórios. ');
      return;
    }
    setSaving(true);
    
    const compraData = { usuario: usuarioId, valor_total: valorTotal };

    try {
      await api.post('/compras/', compraData);
      navigation.goBack();
    } catch (error) {
      window.alert('Erro ' + 'Não foi possível criar a compra. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Usuário</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={usuarioId} onValueChange={setUsuarioId} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione um usuário..." value={undefined} />
          {allUsuarios.map(user => <Picker.Item key={user.id} label={user.nome} value={user.id} /> )}
        </Picker>
      </View>
      
      <Text style={styles.label}>Valor Total (Manual)</Text>
      <TextInput style={styles.input} value={valorTotal} onChangeText={setValorTotal} placeholder="Ex: 150.75" placeholderTextColor="#999" keyboardType="decimal-pad" />
      
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

export default CreateCompraScreen;