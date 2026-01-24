import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecoveryScreen from "../screens/RecoveryScreen";
import JuegoScreen from "../screens/JuegoScreen";
import PerfilScreen from "../screens/PerfilScreen";
import HistoryScreen from "../screens/HistoryScreen";
import EditarPerfil from "../screens/EditarPerfil";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Registro" component={RegisterScreen} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Recovery" component={RecoveryScreen} options={{ headerShown: false }}/>
      <Stack.Screen
      name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false}}/>
      <Stack.Screen 
        name="Tab" component={MyTab} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Juego" component={JuegoScreen}/>
            <Tab.Screen name="Perfil" component={PerfilScreen}/>
            <Tab.Screen name="Historial" component={HistoryScreen}/>
        </Tab.Navigator>
        )
}

export default function StackNavk() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
