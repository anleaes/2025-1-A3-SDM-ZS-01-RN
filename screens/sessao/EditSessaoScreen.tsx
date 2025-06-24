import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import api from '../../services/api';
import { Filme } from '../filme/FilmeScreen';
import { Sessao } from '../sessao/SessaoScreen';

const EditSessaoScreen = ({ route, navigation }: any) => {

  const { sessao } = route.params as { sessao: Sessao };


  const [filmeId, setFilmeId] = useState<number | undefined>();
  const [sala, setSala] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [isActive, setIsActive] = useState(true);

  const [allFilmes, setAllFilmes] = useState<Filme[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    api.get('/filmes/').then(response => {
      setAllFilmes(response.data);
    }).catch(() => {
      window.alert('Erro ' +  ' Não foi possível carregar a lista de filmes. ');
    });
  }, []);


  useEffect(() => {
    if (sessao) {
      const sessaoFilmeId = sessao.filme_id || allFilmes.find(f => f.titulo === sessao.filme)?.id;
      
      setFilmeId(sessaoFilmeId);
      setSala(String(sessao.sala));
      setHorario(new Date(sessao.horario));
      setIsActive(sessao.is_active);
    }
  }, [sessao, allFilmes]);


  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || horario;
    setShowPicker(Platform.OS === 'ios');
    setHorario(currentDate);
  };

  const handleSave = async () => {
    if (!filmeId || !sala) {
      window.alert('Erro ' + 'Filme e Sala são obrigatórios.');
      return;
    }
    setSaving(true);
    
    const sessaoData = {
      filme: filmeId,
      sala: parseInt(sala, 10),
      horario: horario.toISOString(),
      is_active: isActive,
    };

    try {
      await api.put(`/sessoes/${sessao.id}/`, sessaoData);
      navigation.goBack();
    } catch (error) {
      window.alert('Erro ' + ' Não foi possível atualizar a sessão. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Filme</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={filmeId} onValueChange={(itemValue) => setFilmeId(itemValue)} style={styles.picker} dropdownIconColor="#fff">
          <Picker.Item label="Selecione um filme..." value={undefined} />
          {allFilmes.map(filme => (
            <Picker.Item key={filme.id} label={filme.titulo} value={filme.id} />
          ))}
        </Picker>
      </View>
      
      <Text style={styles.label}>Sala</Text>
      <TextInput style={styles.input} value={sala} onChangeText={setSala} placeholder="Número da Sala" placeholderTextColor="#999" keyboardType="numeric" />

    <Text style={styles.label}>Horário</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <Text style={{ color: '#fff', fontSize: 16, marginRight: 10 }}>
        {horario.toLocaleString('pt-BR')}
      </Text>
      <Button onPress={() => setShowPicker(true)} title="Alterar" color="#555" />
    </View>
    {showPicker && (
      <DateTimePicker
        value={horario}
        mode="datetime"
        display="default"
        onChange={onDateChange}
      />
    )}
      <Text style={styles.dateText}>Selecionado: {horario.toLocaleString('pt-BR')}</Text>

      <View style={styles.switchContainer}>
          <Text style={styles.label}>Sessão Ativa</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isActive ? '#3498db' : '#f4f3f4'}
            onValueChange={setIsActive}
            value={isActive}
          />
      </View>
      
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
    switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    dateText: { color: '#fff', marginTop: 10, fontSize: 16 }
});

export default EditSessaoScreen;