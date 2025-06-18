import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateIngressoScreen from '../screens/ingresso/CreateIngressoScreen';
import EditIngressoScreen from '../screens/ingresso/EditIngressoScreen';
import IngressoScreen from '../screens/ingresso/IngressoScreen';

const Stack = createStackNavigator();

const IngressoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="IngressoList" component={IngressoScreen} />
      <Stack.Screen name="CreateIngresso" component={CreateIngressoScreen} />
      <Stack.Screen name="EditIngresso" component={EditIngressoScreen} />
    </Stack.Navigator>
  );
};

export default IngressoStackNavigator;