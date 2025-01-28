import { StyleSheet } from 'react-native';

const stylesGeneral = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        padding: 20,
    },

    addButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 50, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonPopUp: {
        backgroundColor: '#00d68f',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'center',
    },

    addButtonTextPopUp: {
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },

    note: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },

    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    colorPalette: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginVertical: 20
    },

    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignSelf: 'center',
        color: '#333',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },

    deleteButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
    },

    input: {
        height: 40,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        fontWeight: 'bold',
    },

    noteList: {
        marginTop: 20,
    },

});

export default stylesGeneral;