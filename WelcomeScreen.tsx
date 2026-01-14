import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen( {navigation} : any ) {
    return (
    <ImageBackground
    style={styles.container}
    source={{ uri: "https://i.pinimg.com/736x/d7/1f/37/d71f3714df74b28786703558bef5602b.jpg" }}
>
    <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>

        <TouchableOpacity
            onPress={() => navigation.navigate("Local")}
            style={styles.btnLocal}
        >
            <Text style={styles.btnText}>Local</Text>
            <Image
                style={styles.btnimg}
                source={require("../assets/img/fruta.png")}
            />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("Externa")}
            style={styles.btnExterna}
        >
            <Text style={styles.btnText2}>Externa</Text>
            <Image
                style={styles.btnimg2}
                source={require("../assets/img/cohete.png")}
            />
        </TouchableOpacity>

    </View>

    </ImageBackground>
        )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1
    },
    
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 120
    },
    
    title: {
        color: 'white',
        fontSize: 40,
        marginBottom: 20
    },
    
    btnimg: {
        height: 65,
        width: 65
    },
    
    btnLocal: {
        backgroundColor: "#dc8213ff",
        height: 70,
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row'
    },
    
    btnText: {
        color: '#fff',
        fontSize: 25
    },

    btnExterna:{
        backgroundColor: '#7533e0ff',
        height: 70,
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row-reverse',
        margin: 10

    },
    btnText2:{
        color: '#fff',
        fontSize: 25
    },
    btnimg2:{
        height: 35,
        width: 35
    }
})