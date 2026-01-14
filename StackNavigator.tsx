import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../screens/WelcomeScreen";
import ListaLocalScreen from "../screens/ListaLocalScreen";
import ListaExternaScreen from "../screens/ListaExternaScreen";

const Stack = createStackNavigator ()

function MyStack(){
    return(
        <Stack.Navigator >
            <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false}}/>
            <Stack.Screen name="Local" component={ListaLocalScreen}/>
            <Stack.Screen name="Externa" component={ListaExternaScreen}/>
        </Stack.Navigator>
    )
}

export default function StackNav(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}