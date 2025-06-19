// src/screens/ingresso/EditIngressoScreen.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
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
import { Cadeira } from '../cadeira/CadeiraScreen';
import { Sessao } from '../sessao/SessaoScreen';
import { Ingresso } from './IngressoScreen';

const EditIngressoScreen = ({ route, navigation }: any) => {
  const { ingresso } = route.params as { ingresso: Ingresso };

  const [sessaoId, setSessaoId] = useState<number | undefined>();
  const [cadeiraId, setCadeiraId] = useState<number | undefined>();
  const [preco, setPreco] = useState('');


  const [allSessoes, setAllSessoes] = useState<Sessao[]>([]);
  const [allCadeiras, setAllCadeiras] = useState<Cadeira[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/sessoes/').then(response => setAllSessoes(response.data));
    api.get('/cadeiras/').then(response => setAllCadeiras(response.data));
  }, []);

  useEffect(() => {
    if (ingresso) {
      setSessaoId(ingresso.sessao_id);
      setCadeiraId(ingresso.cadeira_id);
      setPreco(ingresso.preco);
    }
  }, [ingresso]);

  const handleSave = async () => {
    if (!sessaoId || !cadeiraId || !preco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const ingressoData = {
      sessao: sessaoId,
      cadeira: cadeiraId,
      preco: preco,
    };

    try {
      await api.put(`/ingressos/${ingresso.codigo}/`, ingressoData);
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.response?.data
        ? JSON.stringify(error.response.data)
        : 'Não foi possível atualizar o ingresso.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Sessão</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={sessaoId} onValueChange={setSessaoId} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione uma sessão..." value={undefined} />
          {allSessoes.map(sessao => (
            <Picker.Item key={sessao.id} label={`${sessao.filme} - Sala ${sessao.sala}`} value={sessao.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Cadeira</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={cadeiraId} onValueChange={setCadeiraId} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione uma cadeira..." value={undefined} />
          {allCadeiras.map(cadeira => (
            <Picker.Item key={cadeira.id} label={`Sala ${cadeira.sala} - ${cadeira.fileira}${cadeira.numero}`} value={cadeira.id} />
          ))}
        </Picker>
      </View>
      
      <Text style={styles.label}>Preço</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} placeholder="Ex: 30.50" placeholderTextColor="#999" keyboardType="numeric" />
      
      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar Alterações" onPress={handleSave} color="#3498db" />}
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

export default EditIngressoScreen;