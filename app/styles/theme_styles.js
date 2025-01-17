import { StyleSheet } from 'react-native';

const sytlesTheme = StyleSheet.create({
    containerThemes: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    switchLabel: {
        fontSize: 18,
        marginRight: 10,
    },
});

export default sytlesTheme;