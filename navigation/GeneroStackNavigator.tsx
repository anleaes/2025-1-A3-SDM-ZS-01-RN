import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CreateGeneroScreen from '../screens/genero/CreateGeneroScreen';
import EditGeneroScreen from '../screens/genero/EditGeneroScreen';
import GeneroScreen from '../screens/genero/GeneroScreen';

const Stack = createStackNavigator();

const GeneroStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GeneroList" component={GeneroScreen} />
      <Stack.Screen name="CreateGenero" component={CreateGeneroScreen} />
      <Stack.Screen name="EditGenero" component={EditGeneroScreen} />
    </Stack.Navigator>
  );
};

export default GeneroStackNavigator;