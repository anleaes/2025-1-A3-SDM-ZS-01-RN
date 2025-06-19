import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

const EditUsuarioScreen = ({ route, navigation }: any) => {
  const { usuarioId } = route.params;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/usuarios/${usuarioId}/`);
        setNome(data.nome);
        setEmail(data.email);
        setCpf(data.cpf);
        setTelefone(data.telefone);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário. " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [usuarioId]);

  const handleSave = async () => {
    if (!nome || !email || !cpf || !telefone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const usuarioData = { nome, email, cpf, telefone };

    try {
      await api.put(`/usuarios/${usuarioId}/`, usuarioData);
      navigation.goBack();
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessages = Object.entries(error.response.data).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`).join('\n');
        Alert.alert('Erro de Validação', errorMessages);
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" style={{ flex: 1, backgroundColor: '#1c1c1e' }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      
      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      
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
});

export default EditUsuarioScreen;