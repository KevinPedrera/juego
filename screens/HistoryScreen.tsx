import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { supabase } from '../supabase/config'

export default function HistoryScreen() {
  type Player = {
      id: string
      user_uid: string
      name: string
      grade?: string
      created_at?: string
    }
    
    // Inserta un estudiante ligado a PruebasUser.uid
    // Devuelve { data, error } (no lanza excepciones)
    async function añadirJugador(userUid: string, name: string) {
      const payload = { user_uid: userUid, name }
      const { data, error } = await supabase
        .from('player')
        .insert([payload])
        .select()
      return { data: data?.[0] ?? null, error }
    }
    async function obtenerJugador(userUid: string) {
      const { data, error } = await supabase
        .from('player')
        .select('*')
        .eq('user_uid', userUid)
      return { data, error }}
  return (
    <View>
      <Text>HistoryScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})