import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/config'
import { stylesGlobal } from '../styles/Styles'

    
export default function RecoveryScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("")
  
  function validarCampo() {
  if (correo === "") {
    Alert.alert("Error", "El correo es obligatorio")
    return
  }

  recuperarContrasenia()
}

function recuperarContrasenia() {
  sendPasswordResetEmail(auth, correo)
    .then(() => {
      Alert.alert(
        "Correcto",
        "Si el correo está registrado, se enviará un enlace de recuperación"
      )
      navigation.goBack()
    })
    .catch(() => {
      Alert.alert("Error", "No se pudo enviar el correo")
    })
}
  
  return (
    <View style={stylesGlobal.container}>

      <Image
        style={styles.img}
        source={require("../assets/img/recuperar.jpg")}
      />

      <Text style={styles.titulo}>
        Recuperar contraseña
      </Text>

      <Text style={styles.texto}>
        Ingresa tu correo electrónico para recuperar tu contraseña
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity 
        style={styles.btn}
         onPress={validarCampo}>
        <Text style={styles.btnTxt}>
          Enviar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.txtVolver}>
          Volver
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c2e24',
    marginBottom: 10,
    textAlign: 'center'
  },
  texto: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  btn: {
    backgroundColor: '#fce2ce',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center'
  },
  btnTxt: {
    color: '#3c2e24',
    fontWeight: 'bold'
  },
  btnVolver: {
    marginTop: 15
  },
  txtVolver: {
    color: '#3c2e24',
    fontSize: 14,
    fontWeight: 'bold'
  }
})
