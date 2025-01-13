import { StyleSheet } from 'react-native';

const stylesMain = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    addButton: {
        marginTop: 10,
      backgroundColor: '#00d68f',
      padding: 10,
      borderRadius: 8,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    noteList: {
      marginTop: 20,
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
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 15,
      fontSize: 16,
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
      color: 'red',
      marginTop: 10,
      textAlign: 'center',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
      },
      deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      noteDate: {
        fontSize: 14,
        color: '#888', // Gris para una apariencia más sutil
        marginTop: 5,
      },
  });

export default stylesMain;