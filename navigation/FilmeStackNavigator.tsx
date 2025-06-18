import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateFilmeScreen from '../screens/filme/CreateFilmeScreen';
import EditFilmeScreen from '../screens/filme/EditFilmeScreen';
import FilmeScreen from '../screens/filme/FilmeScreen';

const Stack = createStackNavigator();

const FilmeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="FilmeList" component={FilmeScreen} />
      <Stack.Screen name="CreateFilme" component={CreateFilmeScreen} />
      <Stack.Screen name="EditFilme" component={EditFilmeScreen} />
    </Stack.Navigator>
  );
};

export default FilmeStackNavigator;