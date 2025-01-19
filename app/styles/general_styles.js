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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        padding: 10,
    }, 
    addButtonPopUp: {
        backgroundColor: '#00d68f',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'center',
    },
    addButtonTextPopUp: {
        color: 'white',
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
        fontSize: 18,
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
        marginBottom: 15,
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
        paddingHorizontal: 27,
        borderRadius: 8,
        alignSelf: 'center',
        color: 'white',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        fontSize: 16,
    },
    noteList: {
        marginTop: 20,
    },

    });

export default stylesGeneral;