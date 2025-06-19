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

type Filme = {
  id: number;
  titulo: string;
};

const CreateSessaoScreen = ({ navigation }: any) => {
  const [filmeId, setFilmeId] = useState<number | undefined>();
  const [sala, setSala] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  const [allFilmes, setAllFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPrerequisites = async () => {
      try {
        setLoading(true);
        const response = await api.get('/filmes/');
        setAllFilmes(response.data);
      } catch (error) {
        window.alert(
          'Erro ao Carregar Dados ' +
          'Não foi possível buscar a lista de filmes para criar a sessão. Verifique sua API e tente novamente. ' + error +
          [{ text: 'OK', onPress: () => navigation.goBack() }] 
        );
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrerequisites();
  }, [navigation]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || horario;
    setShowPicker(Platform.OS === 'ios');
    setHorario(currentDate);
  };

  const handleSave = async () => {
    if (!filmeId || !sala) {
      window.alert('Erro ' + ' Filme e Sala são obrigatórios.');
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
      await api.post('/sessoes/', sessaoData);
      navigation.goBack();
    } catch (error) {
      window.alert('Erro ' + 'Não foi possível salvar a sessão.' + error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" style={styles.loader} />;
  }

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
      <Button onPress={() => setShowPicker(true)} title="Selecionar Data e Hora" color="#555" />
      {showPicker && (
        <DateTimePicker
          value={horario}
          mode="datetime"
          {...(Platform.OS === 'android' && { is24Hour: true })}
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
    loader: { flex: 1, justifyContent: 'center', backgroundColor: '#121212' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#FFFFFF' },
    input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
    buttonContainer: { marginTop: 20, marginBottom: 40 },
    pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginBottom: 12, },
    picker: { color: '#fff', height: 50, },
    switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    dateText: { color: '#fff', marginTop: 10, fontSize: 16 }
});

export default CreateSessaoScreen;