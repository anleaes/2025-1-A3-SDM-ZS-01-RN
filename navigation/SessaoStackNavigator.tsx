import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateSessaoScreen from '../screens/sessao/CreateSessaoScreen';
import EditSessaoScreen from '../screens/sessao/EditSessaoScreen';
import SessaoScreen from '../screens/sessao/SessaoScreen';

const Stack = createStackNavigator();

const SessaoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="SessaoList" component={SessaoScreen} />
      <Stack.Screen name="CreateSessao" component={CreateSessaoScreen} />
      <Stack.Screen name="EditSessao" component={EditSessaoScreen} />
    </Stack.Navigator>
  );
};

export default SessaoStackNavigator;