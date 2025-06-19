import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateItemCompraScreen from '../screens/itemcompra/CreateItemCompraScreen';
import EditItemCompraScreen from '../screens/itemcompra/EditItemCompraScreen';
import ItemCompraScreen from '../screens/itemcompra/ItemCompraScreen';

const Stack = createStackNavigator();

const ItemCompraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
      <Stack.Screen name="ItemCompraList" component={ItemCompraScreen} />
      <Stack.Screen name="CreateItemCompra" component={CreateItemCompraScreen} />
      <Stack.Screen name="EditItemCompra" component={EditItemCompraScreen} />
    </Stack.Navigator>
  );
};

export default ItemCompraStackNavigator;