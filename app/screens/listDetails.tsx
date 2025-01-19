import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import stylesList from './../styles/list_styles';
import stylesGeneral from './../styles/general_styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ListDetailsProps = NativeStackScreenProps<RootStackParamList, 'ListDetails'>;

const ListDetails: React.FC<ListDetailsProps> = ({ route }) => {
    const list = route.params?.list;
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState<string[]>(list?.items || []);
    const [completedItems, setCompletedItems] = useState<boolean[]>(new Array(items.length).fill(false));


    const vibrantColors = ['#FF45A1', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF'];
    const pastelColors = ['#ffebf4', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff'];

    useEffect(() => {
        const loadListItems = async () => {
            if (!list || !list.id) return;
            try {
                const storedLists = await AsyncStorage.getItem('lists');
                if (storedLists) {
                    const parsedLists = JSON.parse(storedLists);
                    const currentList = parsedLists.find((l) => l.id === list.id);
                    if (currentList) {
                        setItems(currentList.items);
                        setCompletedItems(currentList.completedItems || new Array(currentList.items.length).fill(false));
                    }
                }
            } catch (error) {
                console.error('Error loading list items:', error);
            }
        };
        loadListItems();
    }, [list?.id]);

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
        const updatedCompletedItems = [...completedItems, false];
        setItems(updatedItems);
        setCompletedItems(updatedCompletedItems);
    

        try {
            const storedLists = await AsyncStorage.getItem('lists');
            const parsedLists = storedLists ? JSON.parse(storedLists) : [];
            const updatedLists = parsedLists.map((l) =>
                l.id === list.id ? { ...l, items: updatedItems, completedItems: updatedCompletedItems } : l
            );
            await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));

            if (route.params?.onListUpdate) {
                route.params.onListUpdate({ ...list, items: updatedItems, completedItems: updatedCompletedItems });
            }
        } catch (error) {
            console.error('Error saving updated list:', error);
        }
    
        setNewItem('');
    };

    const toggleItemCompletion = (index: number) => {
        const updatedCompletedItems = [...completedItems];
        updatedCompletedItems[index] = !updatedCompletedItems[index];
        setCompletedItems(updatedCompletedItems);
    
        const updateListsInStorage = async () => {
            try {
                const storedLists = await AsyncStorage.getItem('lists');
                if (storedLists) {
                    const parsedLists = JSON.parse(storedLists);
                    const updatedLists = parsedLists.map((l) => {
                        if (l.id === list.id) {
                            return { ...l, items: items, completedItems: updatedCompletedItems };
                        }
                        return l;
                    });
    
                    await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
                }
            } catch (error) {
                console.error('Error saving updated list:', error);
            }
        };
    
        updateListsInStorage();
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
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>{list.title}</Text>

                {items.length > 0 ? (
                    <FlatList
                        data={items}
                        renderItem={({ item, index }) => (
                            <View style={stylesList.listItemContainer}>
                                <TouchableOpacity
                                    onPress={() => toggleItemCompletion(index)}
                                    style={stylesList.checkbox}
                                >
                                    <MaterialCommunityIcons
                                        name={completedItems[index] ? 'checkbox-marked' : 'checkbox-blank'}
                                        size={24}
                                        color={completedItems[index] ? 'green' : 'gray'}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        stylesList.listItemText,
                                        completedItems[index] && { textDecorationLine: 'line-through' },
                                    ]}
                                >
                                    {typeof item === 'string' ? item : ''}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>No items yet. Add one below!</Text>
                )}

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
