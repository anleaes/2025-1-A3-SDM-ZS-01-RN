import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import FilmeStackNavigator from './FilmeStackNavigator';
import GeneroStackNavigator from './GeneroStackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';




export type DrawerParamList = {
  Home: undefined;
  Generos: undefined; 
  Filmes: undefined;
  Usuarios: undefined;
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
        headerStyle: { backgroundColor: '#1c1c1e' },
        headerTintColor: '#fff',
        headerShown: !isLargeScreen,
        drawerActiveTintColor: '#3498db',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16, color: '#fff' },
        drawerStyle: { backgroundColor: '#18181a', width: 250 }, 
        drawerContentStyle: { backgroundColor: '#18181a' },
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
        component={FilmeStackNavigator} 
        options={{
          title: 'Filmes',
          drawerIcon: ({ color, size }) => <Ionicons name="videocam-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Usuarios"
        component={UsuarioStackNavigator} 
        options={{
          title: 'Usuários',
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />          
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;