import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { stylesGlobal } from '../styles/Styles'
import { ref, set } from 'firebase/database'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function RegisterScreen({ navigation }: any) {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [edad, setEdad] = useState(0)
  const [apodo, setApodo] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [foto, setFoto] = useState('')

  function guardarJugador(uid: string) {
    set(ref(db, 'jugadores/' + uid), {
      nombre,
      apellido,
      edad,
      apodo,
      foto: foto || null, 
      correo,
      contrasenia
    })
  }

  function registro() {
    if (!nombre || !apellido || !correo || !contrasenia) {
      Alert.alert("Campos vacíos", "Complete los campos obligatorios")
      return
    }

    if (edad <= 0) {
      Alert.alert("Edad inválida", "Ingrese una edad válida")
      return
    }

    if (!correo.includes("@")) {
      Alert.alert("Correo inválido", "Ingrese un correo válido")
      return
    }

    if (contrasenia.length < 6) {
      Alert.alert("Contraseña inválida", "Debe tener al menos 6 caracteres")
      return
    }

   createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user
        guardarJugador(user.uid)
        Alert.alert("Registro exitoso", "Jugador registrado correctamente")
        navigation.navigate("Login")
      })
      .catch((error) => {
        Alert.alert("Error", error.message)
      })
  }

  return (
    <View style={stylesGlobal.container}>
      <Image
        style={styles.img}
        source={require("../assets/img/registro.png")}
      />
      <Text style={stylesGlobal.titulos}>Registrar Jugador</Text>

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Nombre"
        placeholderTextColor="#ccc9c5"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Apellido"
        placeholderTextColor="#ccc9c5"
        value={apellido}
        onChangeText={setApellido}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Edad"
        placeholderTextColor="#ccc9c5"
        keyboardType="numeric"
        value={edad.toString()}
        onChangeText={(text) => setEdad(Number(text) || 0)}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Apodo"
        placeholderTextColor="#ccc9c5"
        value={apodo}
        onChangeText={setApodo}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Link de foto (opcional)"
        placeholderTextColor="#ccc9c5"
        value={foto}
        onChangeText={setFoto}
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc9c5"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={stylesGlobal.inputs}
        placeholder="Contraseña"
        placeholderTextColor="#ccc9c5"
        secureTextEntry
        value={contrasenia}
        onChangeText={setContrasenia}
      />

      <TouchableOpacity onPress={registro} style={styles.btnRegister}>
        <Text style={styles.btnRegisterTxt}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.vewTxt3}>
        <Text style={{ color: '#898282', fontSize: 12 }}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.txt3}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    img: {
    height: 200,
    width: 200,
  },
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
  }
})
