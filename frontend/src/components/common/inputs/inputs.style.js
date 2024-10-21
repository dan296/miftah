import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    input: {
        borderWidth: 0,
        padding: 10,
        borderColor: "transparent"
    },
    error: {
        color: 'red',
        alignSelf: 'stretch'
    }
})

export default styles;