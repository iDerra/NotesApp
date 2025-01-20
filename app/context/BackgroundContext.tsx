import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
    const [backgroundImage, setBackgroundImage] = useState(null);

    const loadBackgroundFromStorage = async () => {
        try {
            const savedBackground = await AsyncStorage.getItem('backgroundImage');
            if (savedBackground) {
                setBackgroundImage(JSON.parse(savedBackground));
            }
        } catch (error) {
            console.error('Error loading background image:', error);
        }
    };

    useEffect(() => {
        loadBackgroundFromStorage();
    }, []);

    const changeBackground = async (imageSrc) => {
        setBackgroundImage(imageSrc);
        try {
            await AsyncStorage.setItem('backgroundImage', JSON.stringify(imageSrc));
        } catch (error) {
            console.error('Error saving background image:', error);
        }
    };

    return (
        <BackgroundContext.Provider value={{ backgroundImage, changeBackground }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export default BackgroundContext;
