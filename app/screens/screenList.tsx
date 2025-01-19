import React, { useState, useEffect } from 'react';
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



type ScreenListProps = NativeStackScreenProps<RootStackParamList, 'list'>;

const ScreenList: React.FC<ScreenListProps> = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [listColorIndex, setListColorIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const { theme } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(null);
  

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
        saveLists(updatedLists); // Guarda los cambios en AsyncStorage
    };

    navigation.navigate('ListDetails', { list, onListUpdate });
  };

  return (
    <ImageBackground
      source={backgroundImage || require('../../assets/images/background2.webp')} 
      style={stylesGeneral.backgroundImage}
      resizeMode="stretch"
    >
      <View style={stylesGeneral.container}>
        <Text style={[stylesGeneral.title, { color:'#f5f5f5' }]}>LIST NOTES</Text>
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

                  {/* Renderizar los primeros 3 elementos de la lista y tres puntos ("...") si hay más */}
                  <FlatList
                    data={item.items.slice(0, 2)} // Limitar a 3 elementos
                    keyExtractor={(subItem, index) => index.toString()}
                    renderItem={({ item: subItem }) => (
                      <View style={stylesList.listItemContainer}>
                        <View style={stylesList.listItemBullet} />
                        <Text style={stylesList.listItemText}>{subItem}</Text>
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
    </ImageBackground>
  );
};

export default ScreenList;
