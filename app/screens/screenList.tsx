import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, FlatList, Modal } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import stylesList from './../styles/list_styles'
import stylesGeneral from './../styles/general_styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ScreenList = () => {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [listColorIndex, setListColorIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListItem, setNewListItem] = useState('');
  const [expandedListId, setExpandedListId] = useState(null);
  const { theme } = useTheme();

  const vibrantColors = [ '#FF45A1', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF' ];
  const pastelColors = [ '#ffebf4', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff' ];

  useEffect(() => {
    const loadLists = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('lists');
        if (storedLists) {
          setLists(JSON.parse(storedLists));
      }
      } catch (error) {
        console.error('Error while loading notes', error);
      }
    };
    loadLists();
  }, []);
    
  const saveLists = async (newLists) => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(newLists));
    } catch (error) {
      console.error('Error while saving the notes', error);
    }
  };

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

  const toggleExpandList = (listId) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  return (
    <View style={[
      stylesGeneral.container,
      { backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5' }
    ]}>
      <Text style={[stylesGeneral.title, {color: theme === 'dark' ? '#f5f5f5' : '#000000'}]}>LIST NOTES</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => toggleExpandList(item.id)}
            style={{ flex: 1 }}
            onStartShouldSetResponder={(e) => true}
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Text style={[stylesGeneral.noteTitle, { color: item.color }]}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteList(item.id)} style={stylesGeneral.deleteButton}>
                  <FontAwesome6 name="trash-can" size={20} color="red" />
                </TouchableOpacity>
              </View>
            
              {expandedListId === item.id && (
                <View>
                  <View style={stylesList.containerRow}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View>
                      <TextInput
                        style={stylesList.inputText}
                        placeholder="New item"
                        value={newListItem}
                        onChangeText={setNewListItem}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                    <TouchableOpacity
                      style={stylesList.addButtonList}
                      onPress={(e) => {
                        e.stopPropagation();
                        addItemToList(item.id);
                      }}
                    >
                      <Text style={stylesList.addButtonTextList}>Add item</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={item.items}
                    renderItem={({ item }) => (
                      <View style={stylesList.listItemContainer}>
                        <View style={stylesList.listItemBullet} />
                        <Text style={stylesList.listItemText}>{item}</Text>
                      </View>
                    )}
                    keyExtractor={(index) => index.toString()}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>      
        )}
        style={stylesGeneral.noteList}
      />

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
            <TouchableOpacity style={stylesGeneral.addButtonPopUp} onPress={addList}>
              <Text style={stylesGeneral.addButtonTextPopUp}>Add list</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={stylesGeneral.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={stylesGeneral.addButton}>
        <MaterialCommunityIcons name="note-plus" size={36} color={theme === 'dark' ? 'white' : 'gray'} />
      </TouchableOpacity>

    </View>
  );
};

export default ScreenList;
