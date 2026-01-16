import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator()

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" 
            options={{ headerShown: false}}
            component={HomeScreen}/>
            <Stack.Screen name="Login" 
            options={{ headerShown: false}}
            component={LoginScreen}/>
            <Stack.Screen name="Registro" 
            options={{ headerShown: false}}
            component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default function StackNavk(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}