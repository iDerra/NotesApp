import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import stylesGeneral from '../styles/general_styles';
import sytlesTheme from '../styles/theme_styles';
import { Switch } from 'react-native-switch';

import { loadWallpaperId, backgrounds } from '../utils/wallpaperUtils';
import useTheme from '../hooks/useThemes'; // Importa el hook personalizado

const ThemeSettings = () => {
    const { theme, toggleTheme } = useTheme(); // Usa el hook personalizado
    const [selectedWallpaperId, setSelectedWallpaperId] = useState(null);

    useEffect(() => {
        const getWallpaper = async () => {
            const id = await loadWallpaperId();
            setSelectedWallpaperId(id);
        };
        getWallpaper();
    }, []);

    const handleBackgroundChange = async (newBackgroundId) => {
        setSelectedWallpaperId(newBackgroundId);
        try {
            await AsyncStorage.setItem('wallpaperId', newBackgroundId);
        } catch (error) {
            console.error('Error al guardar el ID del fondo de pantalla:', error);
        }
    };

    return (
        <ImageBackground
            source={selectedWallpaperId ? backgrounds[selectedWallpaperId] : require('../../assets/images/background2.webp')}
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View style={[
                sytlesTheme.containerThemes,
                { backgroundColor: theme === 'dark'? '#333333': '#f5f5f5' }
            ]}>
                <View style={[
                    { backgroundColor: theme === 'dark'? '#333333': '#f5f5f5' } 
                ]}>
                    <Text style={[sytlesTheme.title, { color: theme === 'dark'? '#ffffff': '#000000' }]}>
                        Current Theme: {theme === 'dark'? 'Dark Mode': 'Light Mode'}
                    </Text>
                    <View style={sytlesTheme.switchContainer}>
                        <Text style={[sytlesTheme.switchLabel, { color: theme === 'dark'? '#ffffff': '#000000' }]}>
                            Switch to {theme === 'dark'? 'Light Mode': 'Dark Mode'}
                        </Text>
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={toggleTheme}
                            activeText={''}
                            inActiveText={''}
                            circleSize={25}
                            barHeight={15}
                            backgroundActive={'#4E4E4E'}
                            backgroundInactive={'#ccc'}
                            circleActiveColor={'#ffffff'}
                            circleInActiveColor={'#333333'}  
                        />
                    </View>
                </View>
            </View>

            <View style={[
                sytlesTheme.containerThemes,
                { backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5' }
            ]}>
                <Text style={[sytlesTheme.switchLabel, { color: theme === 'dark' ? '#ffffff' : '#000000' }]}>
                Select a Background:
                </Text>
                <View style={sytlesTheme.backgroundContainer}>
                {Object.keys(backgrounds).map((wallpaperId) => (
                    <TouchableOpacity
                    key={wallpaperId}
                    onPress={() => handleBackgroundChange(wallpaperId)}
                    style={[
                        sytlesTheme.backgroundThumbnail,
                        { borderColor: theme === 'dark' ? '#ffffff' : '#000000' }
                    ]}
                    >
                    <Image
                        source={backgrounds[wallpaperId]}
                        style={sytlesTheme.thumbnailImage}
                    />
                    </TouchableOpacity>
                ))}
                </View>
            </View>
        </ImageBackground>
    );
};

export default ThemeSettings;
