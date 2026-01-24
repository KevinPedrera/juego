import { StyleSheet } from "react-native";

export const stylesGlobal = StyleSheet.create({
      container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#faf1e7'
  },
    titulos:{
        fontSize: 24,
        color: "#1f2937",
        fontWeight:'700',
        marginBottom: 24

    },
    inputs:{
        width:"75%",
        height: 48,
        borderWidth: 1,
        borderBlockColor: "#666",
        borderRadius: 20,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: "#ffff",
        marginBottom: 14,
        textAlignVertical: 'center'
    }
})