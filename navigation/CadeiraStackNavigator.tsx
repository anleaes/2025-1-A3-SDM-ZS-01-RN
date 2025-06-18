import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CadeiraScreen from '../screens/cadeira/CadeiraScreen';
import CreateCadeiraScreen from '../screens/cadeira/CreateCadeiraScreen';
import EditCadeiraScreen from '../screens/cadeira/EditCadeiraScreen';

const Stack = createStackNavigator();

const CadeiraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="CadeiraList" component={CadeiraScreen} />
      <Stack.Screen name="CreateCadeira" component={CreateCadeiraScreen} />
      <Stack.Screen name="EditCadeira" component={EditCadeiraScreen} />
    </Stack.Navigator>
  );
};

export default CadeiraStackNavigator;