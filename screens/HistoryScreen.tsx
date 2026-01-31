import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

export default function HistoryScreen() {
  const [partidas, setPartidas] = useState<any[]>([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const partidasRef = ref(db, `jugadores/${uid}/partidas`);

    const listener = onValue(partidasRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setPartidas([]);
        return;
      }

      const lista = Object.values(data)
        .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()); // Orden descendente

      setPartidas(lista);
    });

    return () => listener();
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Partidas</Text>

      {partidas.length === 0?(
        <Text
        style={styles.noData}
        >
          Aún no cuentas con partidas registradas.
        </Text>
      ):
      (

        <FlatList
        data={partidas}
        keyExtractor={(_, index)=> index.toString()}
        renderItem={({item})=>(
          <View 
          style={styles.item} >
            <Text
            style={styles.text}
            >
              Puntaje: {item.puntaje}
            </Text>
            <Text
            style={styles.date}
            >
              Fecha: {new Date(item.fecha).toLocaleString()}
            </Text>
          </View>
        )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#faf1e7', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15 
  },
  noData: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#777' 
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  text: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' },
    date: { fontSize: 14, 
    color: '#666', 
    marginTop: 5 },
});
