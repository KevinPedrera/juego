import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../styles/Styles'

export default function LoginScreen({navigation}:any) {
  return (
    <View style={styles.container}>
       <Image
                style={styles.img}
                source={require("../assets/img/login.png")}/>
      <Text style={stylesGlobal.titulos}>Iniciar Sesion</Text>
      <TextInput style={stylesGlobal.inputs}
      placeholder='Usuario'
      placeholderTextColor="#ccc9c5"/>
      <TextInput style={stylesGlobal.inputs}
      placeholder='Contrasenia'
      placeholderTextColor="#ccc9c5"/>
      <View style={styles.vewTxt1}>
        <TouchableOpacity>
        <Text style={styles.txt1}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogin}
        onPress={() => navigation.navigate("Juego")}>
        <Text style={styles.btnLoginTxt}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <View style={styles.vewTxt3}>
        <Text style={{color:'#898282', fontSize:12}}>¿No tienes una cuenta?</Text>
        <TouchableOpacity
         onPress={() => navigation.navigate("Registro")}>
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
  },
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#faf1e7'
  }
})