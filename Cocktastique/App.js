import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from './component/homeScreen';
import AllCocktailsScreen from './component/allCocktailsScreen';
import SearchByAlcoholScreen from './component/searchByAlcoholScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CocktailDetailsScreen from './component/Details';
import UserPage from './component/User';
import CocktailSearch from './component/searchByAlcoholScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
  },
  drawerItem: {
    position: 'absolute',
    marginBottom : 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  drawerIcon: {
    color: 'grey',
    fontSize: 30,
  },
  drawerLabel: {
    color: 'white',
    fontSize: 16,
  },
});

// Page de connexion
function SignInScreen() {
  return (
    <View>
      <Text>Se connecter</Text>
    </View>
  );
}

// Configuration de la navigation empilable
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      {/* <Stack.Screen name="Second" component={SecondScreen} /> */}
    </Stack.Navigator>
  );
}

// Configuration de la navigation en tiroir
const Drawer = createDrawerNavigator();

function DrawerSignInButton({ navigation }) {
  return (
    <DrawerItem
      icon={({ color, size }) => (
        <MaterialCommunityIcons name="login" style={styles.drawerIcon} />
      )}
      label="Se connecter"
      labelStyle={styles.drawerLabel}
      style={styles.drawerItem}
      onPress={() => navigation.navigate('S\'inscrire')}
    />
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator  drawerStyle={{ 
      backgroundColor: 'black', 
      paddingTop: 40, 
      paddingLeft: 10, 
      paddingBottom: 10 
    }} 
    drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image source={require('./assets/logo.png')} style={{ width: 100, height: 100, marginRight: 10 }} />
          <Text> COCK'TASTIQUE </Text>
          </View>
          <DrawerItemList {...props} />
          <DrawerSignInButton {...props} />
        </DrawerContentScrollView>
      );
    }}>
      <Drawer.Screen name="Random Cocktail" component={StackNavigator} />
      <Drawer.Screen name="All cocktails" component={AllCocktailsScreen} />
      <Drawer.Screen name="Search by alcohol" component={CocktailSearch} />
      <Drawer.Screen name="Details" component={CocktailDetailsScreen} />
      <Drawer.Screen name="S'inscrire" component={UserPage} />
    </Drawer.Navigator>
  );
}

// Appel principal de la navigation
export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

