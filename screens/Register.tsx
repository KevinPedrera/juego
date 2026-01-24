import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { stylesGlobal } from '../styles/Styles'
import { ref, set } from 'firebase/database'
import { db } from '../firebase/config'

export default function Register({navigation}:any) {

  const [Usuario, setUsuario] = useState("")
  const [Correo, setCorreo] = useState("")
  const [Contrasenia, setContrasenia] = useState("")
  const [Contacto, setContacto] = useState(0)

  function LimpiarDatos(){
    setUsuario("")
    setCorreo("")
    setContrasenia("")
    setContacto(0)
  }

  function GuardarUser(){
    if(Usuario.trim() !="" || Correo.trim() !="" || Contrasenia.trim() !="" ){
      set(ref(db, 'Usuario/' + Usuario), {
    username: Usuario,
    email: Correo,
    contrasenia: Contrasenia,
    contacto: Contacto
  });
  LimpiarDatos()
    } else{
      Alert.alert("Error", "No se permiten espacios en blanco")
    }
  }

  return (
    <View
    style={styles.container}
    >
      <Image
                      style={styles.img}
                      source={require("../assets/img/espada.png")}/>
            <Text style={stylesGlobal.titulos}>Registrate</Text>
            <TextInput style={stylesGlobal.inputs}
            placeholder='Usuario'
            placeholderTextColor="#ccc9c5"
            onChangeText={(text)=> setUsuario(text)}
            />
            <TextInput style={stylesGlobal.inputs}
            placeholder='Correo electrónico'
            placeholderTextColor="#ccc9c5"
            onChangeText={(text)=> setCorreo(text)}
            />
            <TextInput style={stylesGlobal.inputs}
            
            placeholder='Contrasenia'
            placeholderTextColor="#ccc9c5"
            onChangeText={(text) => setContrasenia(text)}
            secureTextEntry
            />
            <TextInput style={stylesGlobal.inputs}
            placeholder='Contacto'
            placeholderTextColor="#ccc9c5"
            onChangeText={(text) => setContacto(+text)}
            keyboardType='numeric'
            />
            
            
      
            <TouchableOpacity style={styles.btnLogin}
            onPress={()=>GuardarUser()}
            >
              <Text style={styles.btnLoginTxt}>Registrarse</Text>
            </TouchableOpacity>
            
            <View>
              <Text>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity
              onPress={()=>navigation.navigate("Login")}
              >
              <Text>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
  txt2:{
    color:'#666',
    textAlign:'right'
  },
  txt1: {
    color: '#666',
    fontSize: 12,
    alignSelf: 'flex-end',
    width: '75%',

  },
  btnLoginTxt:{
    color:'#3c2e24'
  },
  btnLogin:{
    marginTop: 20,
    backgroundColor: '#fce2ce',
    paddingVertical: 12,
    paddingHorizontal: '28%',
    borderRadius: 20,
  },
  img:{
    height: 45,
    width: 45,
  },
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#faf1e7'
  }
})