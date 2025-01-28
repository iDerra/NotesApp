import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTheme = async () => {
    try {
        const storedTheme = await AsyncStorage.getItem('theme');
        return storedTheme || 'light'; 
    } catch (error) {
        console.error('Error al cargar el tema:', error);
    return 'light'; 
    }
};

export const saveTheme = async (theme) => {
    try {
        await AsyncStorage.setItem('theme', theme);
        } catch (error) {
        console.error('Error al guardar el tema:', error);
    }
};