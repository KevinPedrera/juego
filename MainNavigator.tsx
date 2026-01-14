import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import Formulario1Screen from "../screens/Formulario1Screen";
import JuegosScreen from "../screens/JuegosScreen";
import Formulario3Screen from "../screens/Formulario3Screen";

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Top = createMaterialTopTabNavigator()

function MyStack(){
    return(
        <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Drawer" component={MyDrawer}/>
        </Stack.Navigator>
    )
}

function MyDrawer(){
    return(
        <Drawer.Navigator 
        initialRouteName="Formulario">
        <Drawer.Screen name="Juegos" component={JuegosScreen}/>
        <Drawer.Screen name="Formulario" component={MyTop}/>
    </Drawer.Navigator>
    )
}

function MyTop(){
    return(
        <Top.Navigator
            initialRouteName="Formulario3">
            <Top.Screen name="Formulario1" component={Formulario1Screen}/>
            <Top.Screen name="Formulario3" component={Formulario3Screen}/>
        </Top.Navigator>
    )
}


export default function MainNav(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}