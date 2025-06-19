import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CompraScreen from '../screens/compra/CompraScreen';
import CreateCompraScreen from '../screens/compra/CreateCompraScreen';
import EditCompraScreen from '../screens/compra/EditCompraScreen';

const Stack = createStackNavigator();

const CompraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
      <Stack.Screen name="CompraList" component={CompraScreen} />
      <Stack.Screen name="CreateCompra" component={CreateCompraScreen} />
      <Stack.Screen name="EditCompra" component={EditCompraScreen} />
    </Stack.Navigator>
  );
};

export default CompraStackNavigator;