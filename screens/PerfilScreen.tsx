import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { onValue, ref } from 'firebase/database';
import { stylesGlobal } from '../styles/Styles';

type User = {
  uid: string;
  nombre: string;
  apellido : string;
  edad: number;
  correo: string;
  apodo:string;
  foto?: string;
};

export default function PerfilScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const usuarioRef = ref(db, 'jugadores/' + uid);
        onValue(usuarioRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUsuario({
              uid,
              nombre: data.nombre || '',
              edad: data.edad || 0,
              correo: data.correo || '',
              apodo: data.apodo || '',
              foto: data.foto || '',
              apellido: data.apellido || '',
            });
          }
        });
      } else {
        setUsuario(null);
      }
    });
  }, []);

  const cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
        navigation.navigate('Login');
      })
      .catch(() => Alert.alert('Error', 'No se pudo cerrar sesión'));
  };

  return (
    <View style={stylesGlobal.container}>
      <Text style={styles.titulo}>Perfil del Usuario</Text>

      <View style={styles.fotoContainer}>
        <Image
          source={
            usuario?.foto
              ? { uri: usuario.foto }
              : require('../assets/img/perfil.png')
          }
          style={styles.foto}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.texto}>
          Nombre: <Text style={styles.valor}>{usuario?.nombre}  {usuario?.apellido}</Text>
        </Text>

        <Text style={styles.texto}>
          Apodo: <Text style={styles.valor}>{usuario?.apodo}</Text>
        </Text>

        <Text style={styles.texto}>
          Edad: <Text style={styles.valor}>{usuario?.edad}</Text>
        </Text>

        <Text style={styles.texto}>
          Correo: <Text style={styles.valor}>{usuario?.correo}</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarPerfil', { usuario })}
      >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3c2e24',
  },
  fotoContainer: {
    marginBottom: 20,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#019481',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
    color: '#3c2e24',
  },
  valor: {
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#f5ae0a',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: '#3c2e24',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff5c29',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
