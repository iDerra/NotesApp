import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesMain from './../styles/main_styles';
import stylesGeneral from '../styles/general_styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { loadWallpaperId, backgrounds } from '../utils/wallpaperUtils'; // Ajusta la ruta si es necesario
import { useFocusEffect } from '@react-navigation/native'; 


const ScreenMain = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteColorIndex, setNoteColorIndex] = useState(0);
  const [noteDate, setNoteDate] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { theme } = useTheme();
  const [editingNote, setEditingNote] = useState(null);
  const [selectedWallpaperId, setSelectedWallpaperId] = useState(null);


  const vibrantColors = [ '#FF45A1', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF' ];
  const pastelColors = [ '#ffebf4', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff' ];

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
  
          const sortedNotes = parsedNotes.sort((a, b) => new Date(a.date) - new Date(b.date));
          setNotes(sortedNotes);
        }
      } catch (error) {
        console.error('Error while loading notes', error);
      }
    };
  
    loadNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getWallpaper = async () => {
        const id = await loadWallpaperId();
        setSelectedWallpaperId(id);
      };
      getWallpaper(); 
  
      return () => {};
    }, [])
  );

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error while saving the notes', error);
    }
  };

  const updateNotes = (newNotes) => {
    const sortedNotes = newNotes.sort((a, b) => new Date(a.date) - new Date(b.date));
    setNotes(sortedNotes);
    saveNotes(sortedNotes);
  };
  
  const saveNote = () => {
    if (noteTitle.trim() !== '') {
      if (editingNote) {
        // Editando una nota existente
        const updatedNotes = notes.map(note =>
          note.id === editingNote.id
            ? { ...note, title: noteTitle, text: noteText, colorIndex: noteColorIndex, date: noteDate || note.date }
            : note
        );
        updateNotes(updatedNotes);
      } else {
        // Creando una nueva nota
        const newNote = {
          id: Date.now().toString(),
          title: noteTitle,
          text: noteText || '',
          colorIndex: noteColorIndex,
          date: noteDate || new Date().toISOString().split('T')[0],
        };
        const updatedNotes = [...notes, newNote];
        updateNotes(updatedNotes);
      }

      setNoteTitle('');
      setNoteText('');
      setNoteColorIndex(0);
      setNoteDate(null);
      setEditingNote(null);
      setIsPopupOpen(false);
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteText(note.text);
    setNoteColorIndex(note.colorIndex);
    setNoteDate(note.date);
    setIsPopupOpen(true);
  };
  
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    updateNotes(updatedNotes);
  };

  const getMarkedDates = () => {
    const markedDates: Record<string, any> = {};

    notes.forEach(note => {
      const noteDate = note.date.split('T')[0];
      if (!markedDates[noteDate]) {
        markedDates[noteDate] = { dots: [] }; 
      }

      markedDates[noteDate].dots.push({
        color: vibrantColors[note.colorIndex],
        selectedDotColor: vibrantColors[note.colorIndex],
      });
    });

    if (selectedDate) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: '#00d68f',
      };
    }

    return markedDates;
  };

  const getOpacity = (noteDate) => {
    const today = new Date();
    const noteDateObj = new Date(noteDate);
    const diffTime = today - noteDateObj;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      return 0.7;
    }
    return 1;
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
      source={selectedWallpaperId ? backgrounds[selectedWallpaperId] : require('../../assets/images/background2.webp')}
      style={stylesGeneral.backgroundImage}
      resizeMode="stretch"
    >
      <View style={[
          stylesGeneral.container,
      ]}>
        <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()}
        markingType="multi-dot"
        theme={{
          calendarBackground: '#f7f7f7',
          textSectionTitleColor: '#555',
          selectedDayBackgroundColor: '#eeeeee',
          selectedDayTextColor: '#000000',
          todayTextColor: '#000000',
          dayTextColor: '#888',
          textDisabledColor: '#ccc',
          dotColor: '#006064',
          selectedDotColor: '#006064',
          arrowColor: '#333',
          monthTextColor: '#333',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '700',
        }}
        style={{
          elevation: 4,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 10,
          borderRadius: 12,
          padding: 10,
          width: '90%',
          alignSelf: 'center',
        }}
      />
        

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                stylesGeneral.note,
                {
                  backgroundColor: pastelColors[item.colorIndex],
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderTopColor: vibrantColors[item.colorIndex],
                  borderLeftColor: vibrantColors[item.colorIndex],
                  opacity: getOpacity(item.date),
                },
              ]}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={stylesGeneral.noteTitle}>{item.title}</Text>
                <Text style={stylesMain.noteDate}>{item.date}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => editNote(item)} style={{marginRight: 15}}>
                    <FontAwesome6 name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteNote(item.id)} style={stylesGeneral.deleteButton}>
                    <FontAwesome6 name="trash-can" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            
              <Text style={{fontSize: 16, marginTop: 5, marginHorizontal: 5}}>{item.text}</Text>
            </View>
          )}
          style={stylesGeneral.noteList}
          showsVerticalScrollIndicator={false}
        />

        <Modal visible={isPopupOpen} transparent>
          <View style={stylesGeneral.modalOverlay}>
            <View style={stylesGeneral.modalContent}>
              <TextInput
                style={stylesGeneral.input}
                placeholder="Title"
                value={noteTitle}
                onChangeText={setNoteTitle}
              />
              <TextInput
                style={stylesGeneral.inputDescription}
                placeholder="Description"
                value={noteText}
                onChangeText={setNoteText}
                multiline
              />
              <Calendar
                onDayPress={(day) => setNoteDate(day.dateString)}
                markedDates={ noteDate ? { [noteDate]: { selected: true, selectedColor: '#00d68f' } } : {} }
                theme={{
                  calendarBackground: '#f7f7f7',
                  textSectionTitleColor: '#555',
                  selectedDayBackgroundColor: '#eeeeee',
                  selectedDayTextColor: '#000000',
                  todayTextColor: '#000000',
                  dayTextColor: '#888',
                  textDisabledColor: '#ccc',
                  dotColor: '#006064',
                  selectedDotColor: '#006064',
                  arrowColor: '#333',
                  monthTextColor: '#333',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                  textDayFontWeight: '500',
                  textMonthFontWeight: '700',
                  textDayHeaderFontWeight: '700',
                }}
                style={{
                  elevation: 4,
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  borderRadius: 12,
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
              <View style={stylesGeneral.colorPalette}>
                {vibrantColors.map((color, index) => {
                  const isSelected = noteColorIndex === index;
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
                      onPress={() => setNoteColorIndex(index)}
                    />
                  );
                })}
              </View>
              <TouchableOpacity style={stylesGeneral.addButtonPopUp} onPress={saveNote}>
                <Text style={stylesGeneral.addButtonTextPopUp}>
                  {editingNote ? 'Save Changes' : 'Add Note'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPopupOpen(false)}>
                <Text style={stylesGeneral.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => setIsPopupOpen(true)} style={stylesGeneral.addButton}>
          <MaterialCommunityIcons name="note-plus" size={36} color={theme === 'dark' ? 'white' : '#555'} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ScreenMain;
