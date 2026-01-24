import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { ref, set } from 'firebase/database';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { stylesGlobal } from '../styles/Styles';

type User = {
  uid: string;
  nombre: string;
  apodo: string;
  edad: number;
  correo: string;
  foto?: string;
};

export default function EditarPerfilScreen({ navigation, route }: any) {
  const usuarioData: User = route.params.usuario;

  const [nombre, setNombre] = useState(usuarioData?.nombre || '');
  const [apodo, setApodo] = useState(usuarioData?.apodo || '');
  const [edad, setEdad] = useState(usuarioData?.edad || 0);
  const [correo, setCorreo] = useState(usuarioData?.correo || '');
  const [foto, setFoto] = useState(usuarioData?.foto || '');
  const [nuevaPass, setNuevaPass] = useState('');

  const uid = usuarioData.uid;

  const actualizarDatos = () => {
    if (!nombre || !apodo || !correo || edad <= 0) {
      Alert.alert('Error', 'Completa todos los campos correctamente');
      return;
    }

    set(ref(db, 'jugadores/' + uid), {
      nombre,
      apodo,
      edad,
      correo,
      foto: foto || '',
    })
      .then(() => {
        if (nuevaPass) {
          if (!auth.currentUser) return;
          if (nuevaPass.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
          }
          updatePassword(auth.currentUser, nuevaPass)
            .then(() => {
              Alert.alert('Datos actualizados', 'Tus datos y contraseña fueron actualizados', [
                { text: 'Aceptar', onPress: () => navigation.navigate('Login') },
              ]);
            })
            .catch((err) => Alert.alert('Error', err.message));
        } else {
          Alert.alert('Datos actualizados', 'Tus datos fueron actualizados correctamente', [
            { text: 'Aceptar', onPress: () => navigation.navigate('Login') },
          ]);
        }
      })
      .catch(() => Alert.alert('Error', 'No se pudieron actualizar los datos'));
  };

  return (
    <ScrollView contentContainerStyle={stylesGlobal.container}>
      <Text style={styles.titulo}>Editar Perfil</Text>

      <View style={styles.fotoContainer}>
        <Image
          source={foto ? { uri: foto } : require('../assets/img/perfil.png')}
          style={styles.foto}
        />
      </View>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={stylesGlobal.inputs}
      />

      <TextInput
        placeholder="Apodo"
        value={apodo}
        onChangeText={setApodo}
        style={stylesGlobal.inputs}
      />

      <TextInput
        placeholder="Edad"
        keyboardType="numeric"
        value={edad.toString()}
        onChangeText={(text) => setEdad(+text)}
        style={stylesGlobal.inputs}
      />

      <TextInput
        placeholder="Link de foto"
        value={foto}
        onChangeText={setFoto}
        style={stylesGlobal.inputs}
      />

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={stylesGlobal.inputs}
      />

      <TextInput
        placeholder="Nueva contraseña (opcional)"
        secureTextEntry
        value={nuevaPass}
        onChangeText={setNuevaPass}
        style={stylesGlobal.inputs}
      />

      <TouchableOpacity style={styles.saveButton} onPress={actualizarDatos}>
        <Text style={styles.saveButtonText}>Actualizar Datos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3c2e24',
    textAlign: 'center',
  },
  fotoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#019481',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#f5ae0a',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#3c2e24',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ff5c29',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
