import { StyleSheet } from 'react-native';

const sytlesTheme = StyleSheet.create({
    containerThemes: {
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 50,
        borderRadius: 30
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
    backgroundContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-around',
    },
    backgroundThumbnail: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 8,
    },
    thumbnailImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
    }
});

export default sytlesTheme;