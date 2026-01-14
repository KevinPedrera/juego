import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../styles/Styles'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
       <Image
                style={styles.img}
                source={require("../assets/img/espada.png")}/>
      <Text style={stylesGlobal.titulos}>Iniciar Sesion</Text>
      <TextInput style={stylesGlobal.inputs}
      placeholder='Usuario'
      placeholderTextColor="#ccc9c5"/>
      <TextInput style={stylesGlobal.inputs}
      placeholder='Contrasenia'
      placeholderTextColor="#ccc9c5"/>
      <TouchableOpacity>
        <Text style={styles.txt1}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <View>
        <Text>¿No tienes una cuenta?</Text>
        <TouchableOpacity>
        <Text>Regístrate</Text>
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