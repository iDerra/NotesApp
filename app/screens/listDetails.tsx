import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, TextInput, Button, Alert } from 'react-native';
import stylesList from './../styles/list_styles';
import stylesGeneral from './../styles/general_styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage


type ListDetailsProps = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

const ListDetails: React.FC<ListDetailsProps> = ({ route }) => {
    const list = route.params?.list;
    const [newItem, setNewItem] = useState(''); // Estado para el nuevo ítem
    const [items, setItems] = useState(list?.items || []); // Estado para los ítems de la lista actual
    
    const vibrantColors = [ '#FF45A1', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF' ];
    const pastelColors = [ '#ffebf4', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff' ];

    useEffect(() => {
        const loadListItems = async () => {
            if (!list || !list.id) return; // Validar que `list` y `list.id` existen
            try {
                const storedLists = await AsyncStorage.getItem('lists');
                if (storedLists) {
                    const parsedLists = JSON.parse(storedLists);
                    const currentList = parsedLists.find((l) => l.id === list.id);
                    if (currentList) {
                        setItems(currentList.items); // Cargar ítems de la lista actual
                    }
                }
            } catch (error) {
                console.error('Error loading list items:', error);
            }
        };
    
        loadListItems();
    }, [list?.id]); // Usa un operador seguro para evitar errores

    const saveUpdatedList = async (updatedList) => {
        try {
            const storedLists = await AsyncStorage.getItem('lists');
            const parsedLists = storedLists ? JSON.parse(storedLists) : [];
            const updatedLists = parsedLists.map((list) =>
                list.id === updatedList.id ? updatedList : list
            );
            await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
        } catch (error) {
            console.error('Error saving updated list:', error);
        }
    };

    const addItem = async () => {
        if (newItem.trim() === '') {
            Alert.alert('Error', 'The input cannot be empty');
            return;
        }
    
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
    
        // Guardar en AsyncStorage
        try {
            const storedLists = await AsyncStorage.getItem('lists');
            const parsedLists = storedLists ? JSON.parse(storedLists) : [];
            const updatedLists = parsedLists.map((l) =>
                l.id === list.id ? { ...l, items: updatedItems } : l
            );
            await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
    
            // Llamar a onListUpdate para notificar cambios
            if (route.params?.onListUpdate) {
                route.params.onListUpdate({ ...list, items: updatedItems });
            }
        } catch (error) {
            console.error('Error saving updated list:', error);
        }
    
        setNewItem(''); // Limpia el campo de entrada
    };

    if (!list) {
        return (
        <ImageBackground
            source={require('../../assets/images/background2.webp')} 
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'red' }}>No list found</Text>
            </View>
        </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/images/background2.webp')} 
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View
              style={[
                stylesGeneral.note,
                {
                  backgroundColor: pastelColors[list.colorIndex],
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderTopColor: vibrantColors[list.colorIndex],
                  borderLeftColor: vibrantColors[list.colorIndex],
                  margin: 20,
                  padding: 20,
                  borderRadius: 8,
                },
              ]}
            >
                {/* Título de la nota */}
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>{list.title}</Text>

                {/* Lista de ítems */}
                {items.length > 0 ? (
                    <FlatList
                        data={items}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                <View style={stylesList.listItemBullet} />
                                <Text style={stylesList.listItemText}>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>No items yet. Add one below!</Text>
                )}

                {/* Formulario para añadir nuevo ítem */}
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10,
                            paddingHorizontal: 8,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                        }}
                        placeholder="Add new item"
                        value={newItem}
                        onChangeText={setNewItem}
                    />
                    <Button title="Add Item" onPress={addItem} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default ListDetails;
