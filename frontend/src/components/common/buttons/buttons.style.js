import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {

        width: '100%',
        
        borderRadius: 5,

        padding: 15,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2
    },
    container_TERTIARY: {

    },

    text: {
        fontWeight: 'bold'
    },
    text_PRIMARY: {
        color: 'white'
    },
    text_SECONDARY: {
        color: '#3B71F3'
    },
    text_TERTIARY: {
        color: 'grey'
    },
    icon: {
        position: "absolute",
        left: 15,
        width: 30,
    }
})

export default styles;