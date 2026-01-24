import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation} : any) {
  return (
    <ImageBackground 
    source={{uri:"https://www.xtrafondos.com/wallpapers/vertical/paisaje-minecraft-atardecer-en-la-selva-12978.jpg",}}
    style={styles.container}
    resizeMode='cover'>

      <View style={styles.content}>
        <TouchableOpacity
        style={styles.btn} 
        onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btnText}>Jugar</Text>
          <Image
          style={styles.btnimg}
          source={require("../assets/img/espada.png")}/>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnimg: {
        height: 45,
        width: 45,
    },
  content:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 200
  },
  btnText:{
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold'
  },
  btn:{
    backgroundColor: "#dc8213ff",
    height: "11%",
    width: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row'
  },
  container:{
    flex: 1,
    justifyContent: 'flex-end'
  }
})