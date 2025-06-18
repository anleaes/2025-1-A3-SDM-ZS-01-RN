import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import api from '../../services/api';

const CreateCadeiraScreen = ({ navigation }: any) => {
  const [fileira, setFileira] = useState('');
  const [numero, setNumero] = useState('');
  const [sala, setSala] = useState('');
  const [tipo, setTipo] = useState<'NORMAL' | 'VIP' | 'PCD'>('NORMAL');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fileira || !numero || !sala) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const cadeiraData = {
      fileira,
      numero: parseInt(numero, 10),
      sala: parseInt(sala, 10),
      tipo,
    };

    try {
      await api.post('/cadeiras/', cadeiraData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a cadeira.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Sala</Text>
      <TextInput style={styles.input} value={sala} onChangeText={setSala} placeholder="Ex: 1" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Fileira</Text>
      <TextInput style={styles.input} value={fileira} onChangeText={setFileira} placeholder="Ex: A" placeholderTextColor="#999" maxLength={2} autoCapitalize="characters" />
      
      <Text style={styles.label}>Número</Text>
      <TextInput style={styles.input} value={numero} onChangeText={setNumero} placeholder="Ex: 12" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Normal" value="NORMAL" />
          <Picker.Item label="VIP" value="VIP" />
          <Picker.Item label="PCD" value="PCD" />
        </Picker>
      </View>
      
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

export default CreateCadeiraScreen;