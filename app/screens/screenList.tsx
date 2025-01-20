import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import stylesList from './../styles/list_styles';
import stylesGeneral from './../styles/general_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundContext from '../context/BackgroundContext';

type ScreenListProps = NativeStackScreenProps<RootStackParamList, 'list'>;

const ScreenList: React.FC<ScreenListProps> = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [listColorIndex, setListColorIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const { theme } = useTheme();
  const { backgroundImage } = useContext(BackgroundContext);

  

  const vibrantColors = ['#FF45A1', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF'];
  const pastelColors = ['#ffebf4', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff'];

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

  useFocusEffect(
    React.useCallback(() => {
        const loadLists = async () => {
            try {
                const storedLists = await AsyncStorage.getItem('lists');
                if (storedLists) {
                    setLists(JSON.parse(storedLists));
                }
            } catch (error) {
                console.error('Error loading lists:', error);
            }
        };
        loadLists();
    }, [])
  );

  const addList = () => {
    if (listTitle.trim() !== '') {
      const newList = {
        id: Date.now().toString(),
        title: listTitle,
        colorIndex: listColorIndex,
        items: [],
      };

      const updatedLists = [...lists, newList];
      setLists(updatedLists);
      saveLists(updatedLists);

      setListTitle('');
      setListColorIndex(0);
      setIsModalVisible(false);
    }
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    saveLists(updatedLists);
  };

  const navigateToListDetails = (list) => {
    const onListUpdate = (updatedList) => {
        const updatedLists = lists.map((l) =>
            l.id === updatedList.id ? updatedList : l
        );
        setLists(updatedLists);
        saveLists(updatedLists);
    };

    navigation.navigate('ListDetails', { list, onListUpdate });
  };

  const darkenColor = (color, factor = 0.2) => {
    const hex = color.startsWith('#') ? color.substring(1) : color;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    const newR = Math.max(0, Math.min(255, r - r * factor));
    const newG = Math.max(0, Math.min(255, g - g * factor));
    const newB = Math.max(0, Math.min(255, b - b * factor));
  
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
  };

  return (
    <ImageBackground
      source={backgroundImage || require('../../assets/images/background2.webp')} 
      style={stylesGeneral.backgroundImage}
      resizeMode="stretch"
    >
      <View style={stylesGeneral.container}>
        <Text style={[stylesGeneral.title, { backgroundColor: '#f5f5f5', borderRadius: 20, padding: 10, marginHorizontal: 50, color:'black' }]}>LIST NOTES</Text>
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToListDetails(item)} style={{ flex: 1 }}>
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
                  {item.id === selectedListId && (
                    <View
                      style={[
                        stylesGeneral.overlay,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0.10)',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        },
                      ]}
                    />
                  )}

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[stylesGeneral.noteTitle, { color: item.color }]}>{item.title}</Text>
                    <TouchableOpacity onPress={() => deleteList(item.id)} style={stylesGeneral.deleteButton}>
                      <FontAwesome6 name="trash-can" size={20} color="red" />
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={item.items.slice(0, 2)}
                    keyExtractor={(subItem, index) => index.toString()}
                    renderItem={({ item: subItem }) => (
                      <View style={stylesList.listItemContainer}>
                        <View style={stylesList.listItemBullet} />
                        <Text style={stylesList.listItemText}>{typeof subItem === 'string' ? subItem : ''}</Text>
                      </View>
                    )}
                    ListFooterComponent={() => (
                      item.items.length > 2 ? (
                        <View style={stylesList.listItemContainer}>
                          <View style={stylesList.listItemBullet} />
                          <Text style={stylesList.listItemText}>...</Text>
                        </View>
                      ) : null
                    )}
                    showsVerticalScrollIndicator={false}
                  />
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
                placeholder="Title"
                value={listTitle}
                onChangeText={setListTitle}
              />
              <View style={stylesGeneral.colorPalette}>
                {vibrantColors.map((color, index) => {
                  const isSelected = listColorIndex === index;
                  return (
                    <TouchableOpacity
                      key={color}
                      style={[
                        stylesGeneral.colorOption,
                        {
                          backgroundColor: isSelected ? darkenColor(pastelColors[index], 0.05) : pastelColors[index],
                          borderWidth: 2,
                          borderColor: isSelected ? 'black' : color,
                        },
                      ]}
                      onPress={() => setListColorIndex(index)}
                    />
                  );
                })}
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
          <MaterialCommunityIcons name="note-plus" size={36} color={theme === 'dark' ? 'white' : '#555'} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ScreenList;
