import { StyleSheet } from 'react-native';

const sytlesTheme = StyleSheet.create({
    
    containerThemes: {
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 50,
        borderRadius: 30,
        backgroundColor: 'white',
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