import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesGlobal } from '../styles/Styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen({navigation}:any) {

  async function ControlBiom(){
    const reultAuth = await LocalAuthentication.authenticateAsync({})
    promptMessage:"Ingresa la contraseña"
    disableDeviceFallback: true

    if(reultAuth.success){
      console.log("Ingreo Exitoso");
      navigation.navigate("Perfil")
    }else{
      console.log("El ingreso falló");
      
    }
  }

  async function LoginExitoso (token: any){
    await SecureStore.setItemAsync("token", token )
  }
  async function revisarToken(){
    const token = await SecureStore.getItemAsync('token')
    console.log(token);
    
    if(!token){
      return false;
    }
    ControlBiom()
  }

  useEffect(() => {
    revisarToken()
  }, [])
  

  //////////////////////////
  const [correo, setCorreo] = useState("")
  const [contrasenia, setContrasenia] = useState("")

  function login() {
    if (correo === "" || contrasenia === "") {
      Alert.alert("Error", "Debe completar todos los campos")
      return
    }

    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then(() => {
        LoginExitoso(auth)
        navigation.navigate("Tab")
      })
      .catch((error) => {
        let titulo = "Error"
        let mensaje = "Revisar las credenciales ingresadas"

        if (error.code === "auth/invalid-credential") {
          titulo = "Error de credenciales"
          mensaje = "Correo o contraseña incorrectos"
        } else if (error.code === "auth/missing-password") {
          titulo = "Error de contraseña"
          mensaje = "Debe ingresar una contraseña"
        }

        Alert.alert(titulo, mensaje)
      })
  }

  return (
    <View style={stylesGlobal.container}>

      <Image
        style={styles.img}
        source={require("../assets/img/login.png")}
      />

      <Text style={stylesGlobal.titulos}>Iniciar Sesión</Text>

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Correo"
        placeholderTextColor="#ccc9c5"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setCorreo}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Contraseña"
        placeholderTextColor="#ccc9c5"
        secureTextEntry
        onChangeText={setContrasenia}
      />

      <View style={styles.vewTxt1}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Recovery")}
        >
          <Text style={styles.txt1}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnLogin}
        onPress={login}
      >
        <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.vewTxt3}>
        <Text style={{ color: '#898282', fontSize: 12 }}>
          ¿No tienes una cuenta?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.txt3}>Regístrate</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  vewTxt3:{
    marginTop: 25,
    flexDirection: 'row'
  },
  vewTxt2:{
    flexDirection:'row',
    marginTop: 25,
  },
  vewTxt1:{
    width:'75%',
    alignItems: 'flex-end'
  },
  txt3:{
    color:'#f5ae0a',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 12
  },
  txt1: {
    color: '#898282',
    fontSize: 12,

  },
  btnLoginTxt:{
    color:'#3c2e24'
  },
  btnLogin:{
    marginTop: 40,
    backgroundColor: '#fce2ce',
    paddingVertical: 12,
    paddingHorizontal: '28%',
    borderRadius: 20,
  },
  img:{
    height: 300,
    width: 300,
    borderRadius: 15
  }
})