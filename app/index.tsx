import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesMain from './styles/main_styles';

const App: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteColorIndex, setNoteColorIndex] = useState(0);
  const [noteDate, setNoteDate] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const vibrantColors = [
    '#FF4C8B', '#FF9F4D', '#FFEB3B', '#00D68F', '#00A9E6',
    '#7C4DFF', '#FF45A1'
  ];

  const pastelColors = [
    '#ffd8e3', '#ffedcc', '#ffffe0', '#d0f0c0',
    '#e0f7fa', '#e8d0ff', '#ffebf4'
  ];

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Error al cargar las notas', error);
      }
    };

    loadNotes();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error al guardar las notas', error);
    }
  };

  const addNote = () => {
    if (noteTitle.trim() !== '') {
      const newNote = {
        id: Date.now().toString(),
        title: noteTitle,
        text: noteText || '',
        colorIndex: noteColorIndex, // Guardamos el índice del color
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
      const noteDate = note.date.split('T')[0]; // Formato yyyy-mm-dd
      if (!markedDates[noteDate]) {
        markedDates[noteDate] = { dots: [] }; // Crear entrada si no existe
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
    <View style={stylesMain.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()} // Marcar las fechas con puntos
        markingType="multi-dot" // Tipo de marcado para permitir múltiples puntos
      />
      <View style={stylesMain.header}>
        <TouchableOpacity onPress={() => setIsPopupOpen(true)} style={stylesMain.addButton}>
          <Text style={stylesMain.addButtonText}>+ Note</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              stylesMain.note,
              {
                backgroundColor: pastelColors[item.colorIndex],
                borderTopWidth: 4,
                borderLeftWidth: 4,
                borderTopColor: vibrantColors[item.colorIndex],
                borderLeftColor: vibrantColors[item.colorIndex],
              },
            ]}
          >
            <Text style={stylesMain.noteTitle}>{item.title}</Text>
            <Text>{item.text}</Text>
            <Text style={stylesMain.noteDate}>Date: {item.date}</Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)} style={stylesMain.deleteButton}>
              <Text style={stylesMain.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        style={stylesMain.noteList}
      />

      <Modal visible={isPopupOpen} transparent>
        <View style={stylesMain.modalOverlay}>
          <View style={stylesMain.modalContent}>
            <TextInput
              style={stylesMain.input}
              placeholder="Note Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
            <TextInput
              style={stylesMain.input}
              placeholder="Note Text"
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />
            <Calendar
              onDayPress={(day) => setNoteDate(day.dateString)}
              markedDates={
                noteDate
                  ? { [noteDate]: { selected: true, selectedColor: '#00d68f' } }
                  : {}
              }
            />
            <View style={stylesMain.colorPalette}>
              {vibrantColors.map((color, index) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    stylesMain.colorOption,
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
            <TouchableOpacity style={stylesMain.addButton} onPress={addNote}>
              <Text style={stylesMain.addButtonText}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsPopupOpen(false)}>
              <Text style={stylesMain.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
