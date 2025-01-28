import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadWallpaperId = async () => {
    try {
        const wallpaperId = await AsyncStorage.getItem('wallpaperId');
        return wallpaperId; 
    } catch (error) {
        console.error('Error while loading wallpaper ID:', error);
        return null; 
    }
};

export const backgrounds = {
    '1': require('../../assets/images/background1.jpeg'),
    '2': require('../../assets/images/background2.webp'),
    '3': require('../../assets/images/background3.webp'),
};