import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, FlatList, Modal } from 'react-native';
import stylesList from './../styles/list_styles'
import stylesGeneral from './../styles/general_styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenList = () => {
    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState('');
    const [listColorIndex, setListColorIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false); // Para controlar la visibilidad del modal
    const [newListItem, setNewListItem] = useState(''); // Elemento para añadir a la lista seleccionada
    const [expandedListId, setExpandedListId] = useState(null); // Para expandir y contraer las listas

    const vibrantColors = [
        '#FF4C8B', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6',
        '#7C4DFF', '#FF45A1'
    ];

    const pastelColors = [
        '#ffd8e3', '#ffedcc', '#ffffe0', '#d0f0c0',
        '#e0f7fa', '#e8d0ff', '#ffebf4'
    ];

    useEffect(() => {
        const loadLists = async () => {
            try {
                const storedLists = await AsyncStorage.getItem('lists');
                if (storedLists) {
                    setLists(JSON.parse(storedLists));
            }
            } catch (error) {
                console.error('Error al cargar las notas', error);
            }
        };
    
        loadLists();
    }, []);
    
    const saveLists = async (newLists) => {
        try {
            await AsyncStorage.setItem('lists', JSON.stringify(newLists));
        } catch (error) {
            console.error('Error al guardar las notas', error);
        }
    };

    // Función para crear una nueva lista
    const addList = () => {
        if (listTitle.trim() !== '') {
            const newList = {
                id: Date.now().toString(),
                title: listTitle,
                colorIndex: listColorIndex,
                items: []
            };

            const updatedLists = [...lists, newList];
            setLists(updatedLists);
            saveLists(updatedLists);

            setListTitle('');
            setListColorIndex(0);
            setIsModalVisible(false);
        }
    };

    const deleteList = (id: string) => {
        const updatedLists = lists.filter(list => list.id !== id);
        setLists(updatedLists);
        saveLists(updatedLists);
    };

  // Función para agregar un elemento a la lista
    const addItemToList = (listId) => {
        if (newListItem.trim()) {
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
            list.items.push(newListItem);
            }
            return list;
        });
        setLists(updatedLists);
        saveLists(updatedLists)
        setNewListItem('');
        }
    };

  // Función para mostrar/ocultar lista expandida
    const toggleExpandList = (listId) => {
        setExpandedListId(expandedListId === listId ? null : listId);
    };

    return (
        <View style={stylesGeneral.container}>
        <Text style={stylesGeneral.title}>LIST NOTES</Text>

        {/* Mostrar listas creadas */}
        <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => toggleExpandList(item.id)}
                style={{ flex: 1 }}
                onStartShouldSetResponder={(e) => true} // Inicia el responder en el TouchableOpacity
              >
                <View
                  style={[
                    stylesGeneral.note,
                    {
                      backgroundColor: pastelColors[item.colorIndex],
                      borderTopWidth: 4,
                      borderLeftWidth: 4,
                      borderTopColor: vibrantColors[item.colorIndex],
                      borderLeftColor: vibrantColors[item.colorIndex],
                    },
                  ]}
                >
                  {/* Contenedor en fila */}
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Text style={[stylesGeneral.noteTitle, { color: item.color }]}>{item.title}</Text>
                    <TouchableOpacity onPress={() => deleteList(item.id)} style={stylesGeneral.deleteButton}>
                      <Text style={stylesGeneral.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
              
                  {/* Descripción de la nota */}
                  {expandedListId === item.id && (
                    <View>
                      <FlatList
                        data={item.items}
                        renderItem={({ item }) => <Text style={stylesList.listItem}>{item}</Text>}
                        keyExtractor={(index) => index.toString()}
                      />
                      <TouchableWithoutFeedback
                        onPress={() => {}}
                        >
                        <View>
                            <TextInput
                            style={stylesGeneral.input}
                            placeholder="New item"
                            value={newListItem}
                            onChangeText={setNewListItem}
                            />
                        </View>
                        </TouchableWithoutFeedback>
                      <TouchableOpacity
                        style={stylesGeneral.addButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            addItemToList(item.id);
                          }}
                      >
                        <Text style={stylesGeneral.addButtonText}>Add item</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              
        )}
        style={stylesGeneral.noteList}
    />

      {/* Botón para crear una nueva lista */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={stylesGeneral.addButton}>
        <Text style={stylesGeneral.addButtonText}>Add new list</Text>
      </TouchableOpacity>

      {/* Modal para crear una nueva lista */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={stylesGeneral.modalOverlay}>
          <View style={stylesGeneral.modalContent}>
            <TextInput
              style={stylesGeneral.input}
              placeholder="Título de la lista"
              value={listTitle}
              onChangeText={setListTitle}
            />
            <View style={stylesGeneral.colorPalette}>
                {vibrantColors.map((color, index) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            stylesGeneral.colorOption,
                            {
                                backgroundColor: pastelColors[index],
                                borderWidth: 2,
                                borderColor: color,
                            },
                        ]}
                        onPress={() => setListColorIndex(index)}
                    />
                ))}
            </View>
            <TouchableOpacity style={stylesGeneral.addButton} onPress={addList}>
              <Text style={stylesGeneral.addButtonText}>Crear Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesGeneral.cancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScreenList;
