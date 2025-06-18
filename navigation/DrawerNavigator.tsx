import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import GeneroStackNavigator from './GeneroStackNavigator';


export type DrawerParamList = {
  Home: undefined;
  Generos: undefined; 
  Filmes: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#fff',
        headerShown: !isLargeScreen,
        drawerActiveTintColor: '#3498db',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      
      <Drawer.Screen
        name="Generos"
        component={GeneroStackNavigator} 
        options={{
          title: 'Gêneros',
          drawerIcon: ({ color, size }) => <Ionicons name="film-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Filmes"
        component={GeneroStackNavigator} 
        options={{
          title: 'Filmes',
          drawerIcon: ({ color, size }) => <Ionicons name="videocam-outline" size={size} color={color} />,
        }}
      />       
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;