import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { stylesGlobal } from '../styles/Styles'

export default function RegisterScreen({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text style={stylesGlobal.titulos}>RegisterScreen</Text>

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Nombre"
        placeholderTextColor="#ccc9c5"
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Apellido"
        placeholderTextColor="#ccc9c5"
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Edad"
        placeholderTextColor="#ccc9c5"
        keyboardType="numeric"
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc9c5"
        keyboardType="email-address"
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Contraseña"
        placeholderTextColor="#ccc9c5"
        secureTextEntry
      />
      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.btnRegisterTxt}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.vewTxt3}>
        <Text style={{ color: '#898282', fontSize: 12 }}>
          ¿Ya tienes una cuenta?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.txt3}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
      </View>

  )
}

const styles = StyleSheet.create({
  vewTxt3: {
    marginTop: 25,
    flexDirection: 'row'
  },
  txt3: {
    color: '#f5ae0a',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 12
  },
  btnRegisterTxt: {
    color: '#3c2e24'
  },
  btnRegister: {
    marginTop: 30,
    backgroundColor: '#fce2ce',
    paddingVertical: 12,
    paddingHorizontal: '25%',
    borderRadius: 20,
  },
  img: {
    height: 250,
    width: 250,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#faf1e7'
  }
})
