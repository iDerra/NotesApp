import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import stylesGeneral from '../styles/general_styles';
import sytlesTheme from '../styles/theme_styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadWallpaperId, backgrounds } from '../utils/wallpaperUtils';

const ThemeSettings = () => {
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
            ]}>
                <Text style={sytlesTheme.switchLabel}>
                Select a Background:
                </Text>
                <View style={sytlesTheme.backgroundContainer}>
                {Object.keys(backgrounds).map((wallpaperId) => (
                    <TouchableOpacity
                    key={wallpaperId}
                    onPress={() => handleBackgroundChange(wallpaperId)}
                    style={[
                        sytlesTheme.backgroundThumbnail,
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
