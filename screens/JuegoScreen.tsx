import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/config';
import { ref, push } from 'firebase/database';

const colors = [
  { nombre: 'Rojo', color: 'red' },
  { nombre: 'Verde', color: 'green' },
  { nombre: 'Azul', color: 'blue' },
  { nombre: 'Amarillo', color: 'yellow' },
];

export default function JuegoScreen() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [round, setRound] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const addStep = (prevSeq: string[]) => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)].nombre;
    const newSeq = [...prevSeq, nextColor];
    setSequence(newSeq);
    setUserSequence([]);
    Alert.alert('Mira la secuencia', newSeq.join(', '));
  };

  const handlePress = (colorNombre: string) => {
    if (!playing) return;
    const newUserSeq = [...userSequence, colorNombre];
    setUserSequence(newUserSeq);

    const currentIndex = newUserSeq.length - 1;

    if (newUserSeq[currentIndex] !== sequence[currentIndex]) {
      endGame();
      return;
    }

    if (newUserSeq.length === sequence.length) {
      const nextRound = round + 1;
      setRound(nextRound);
      addStep(sequence);
    }
  };

  const endGame = () => {
    setPlaying(false);
    setGameStarted(false);
    const uid = auth.currentUser?.uid;

    if (uid) {
      push(ref(db, `jugadores/${uid}/partidas`), {
        puntaje: round,
        fecha: new Date().toISOString(),
      });
    }

    Alert.alert('Fin del juego', `Puntaje: ${round}`, [
      {
        text: 'Jugar de nuevo',
        onPress: () => {
          setRound(0);
          setSequence([]);
          setUserSequence([]);
          setGameStarted(false);
        },
      },
    ]);
  };

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setRound(0);
    setPlaying(true);
    setGameStarted(true);
    addStep([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juego de Memoria</Text>

      {!gameStarted ? (
        <TouchableOpacity style={styles.playButton} onPress={startGame}>
          <Text style={styles.playButtonText}>Jugar</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.subtitle}>Ronda: {round + 1}</Text>
          <View style={styles.buttonsContainer}>
            {colors.map((c) => (
              <TouchableOpacity
                key={c.nombre}
                style={[styles.colorButton, { backgroundColor: c.color }]}
                onPress={() => handlePress(c.nombre)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf1e7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  buttonsContainer: { flexDirection: 'row', flexWrap: 'wrap', width: 250, justifyContent: 'space-around' },
  colorButton: { width: 100, height: 100, margin: 10, borderRadius: 10 },
  playButton: { backgroundColor: '#019481', padding: 15, borderRadius: 10 },
  playButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
