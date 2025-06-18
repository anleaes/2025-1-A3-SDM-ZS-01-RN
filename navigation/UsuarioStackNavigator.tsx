// src/navigation/UsuarioStackNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateUsuarioScreen from '../screens/usuario/CreateUsuarioScreen';
import EditUsuarioScreen from '../screens/usuario/EditUsuarioScreen';
import UsuarioScreen from '../screens/usuario/UsuarioScreen';

const Stack = createStackNavigator();

const UsuarioStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' } 
    }}>
      <Stack.Screen name="UsuarioList" component={UsuarioScreen} />
      <Stack.Screen name="CreateUsuario" component={CreateUsuarioScreen} />
      <Stack.Screen name="EditUsuario" component={EditUsuarioScreen} />
    </Stack.Navigator>
  );
};

export default UsuarioStackNavigator;