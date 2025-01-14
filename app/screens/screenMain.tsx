import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesMain from './../styles/main_styles';
import stylesGeneral from '../styles/general_styles';

const ScreenMain = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteColorIndex, setNoteColorIndex] = useState(0);
  const [noteDate, setNoteDate] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const vibrantColors = [ '#FF4C8B', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6', '#7C4DFF', '#FF45A1' ];
  const pastelColors = [ '#ffd8e3', '#ffedcc', '#ffffe0', '#d0f0c0', '#e0f7fa', '#e8d0ff', '#ffebf4' ];

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Error while loading notes', error);
      }
    };

    loadNotes();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error while saving the notes', error);
    }
  };

  const addNote = () => {
    if (noteTitle.trim() !== '') {
      const newNote = {
        id: Date.now().toString(),
        title: noteTitle,
        text: noteText || '',
        colorIndex: noteColorIndex,
        date: noteDate || new Date().toISOString().split('T')[0],
      };

      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);

      setNoteTitle('');
      setNoteText('');
      setNoteColorIndex(0);
      setNoteDate(null);
      setIsPopupOpen(false);
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
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

  return (
    <View style={stylesGeneral.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()} // Marcar las fechas con puntos
        markingType="multi-dot" // Tipo de marcado para permitir múltiples puntos
      />
      <View style={stylesGeneral.header}>
        <TouchableOpacity onPress={() => setIsPopupOpen(true)} style={stylesGeneral.addButton}>
          <Text style={stylesGeneral.addButtonText}>+ Note</Text>
        </TouchableOpacity>
      </View>

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
              },
            ]}
          >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={stylesGeneral.noteTitle}>{item.title}</Text>
              <Text style={stylesMain.noteDate}>{item.date}</Text>
              <TouchableOpacity onPress={() => deleteNote(item.id)} style={stylesGeneral.deleteButton}>
                <Text style={stylesGeneral.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          
            <Text>{item.text}</Text>
          </View>
        )}
        style={stylesGeneral.noteList}
      />

      <Modal visible={isPopupOpen} transparent>
        <View style={stylesGeneral.modalOverlay}>
          <View style={stylesGeneral.modalContent}>
            <TextInput
              style={stylesGeneral.input}
              placeholder="Note Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
            <TextInput
              style={stylesGeneral.input}
              placeholder="Note Text"
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />
            <Calendar
              onDayPress={(day) => setNoteDate(day.dateString)}
              markedDates={ noteDate ? { [noteDate]: { selected: true, selectedColor: '#00d68f' } } : {} }
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
                  onPress={() => setNoteColorIndex(index)}
                />
              ))}
            </View>
            <TouchableOpacity style={stylesGeneral.addButton} onPress={addNote}>
              <Text style={stylesGeneral.addButtonText}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsPopupOpen(false)}>
              <Text style={stylesGeneral.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScreenMain;
