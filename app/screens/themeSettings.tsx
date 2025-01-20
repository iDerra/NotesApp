import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import stylesGeneral from '../styles/general_styles';
import sytlesTheme from '../styles/theme_styles';
import { Switch } from 'react-native-switch';
import BackgroundContext from '../context/BackgroundContext';

const ThemeSettings = () => {
    const { theme, toggleTheme } = useTheme();
    const { backgroundImage, changeBackground } = useContext(BackgroundContext);


    const backgrounds = [
        { id: 1, src: require('../../assets/images/background1.jpeg') },
        { id: 2, src: require('../../assets/images/background2.webp') },
        { id: 3, src: require('../../assets/images/background3.webp') }
    ];

    return (
        <ImageBackground
            source={backgroundImage || require('../../assets/images/background2.webp')} 
            style={stylesGeneral.backgroundImage}
            resizeMode="stretch"
        >
            <View style={[
                sytlesTheme.containerThemes,
                { backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5' }
            ]}>
                <View style={[
                    { backgroundColor: backgroundImage ? 'rgba(0,0,0,0)' : (theme === 'dark' ? '#333333' : '#f5f5f5') }
                ]}>
                    <Text style={[sytlesTheme.title, { color: theme === 'dark' ? '#ffffff' : '#000000' }]}>
                        Current Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </Text>
                    <View style={sytlesTheme.switchContainer}>
                        <Text style={[sytlesTheme.switchLabel, { color: theme === 'dark' ? '#ffffff' : '#000000' }]}>
                            Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
                    {backgrounds.map((background) => (
                        <TouchableOpacity
                            key={background.id}
                            onPress={() => changeBackground(background.src)}
                            style={[
                                sytlesTheme.backgroundThumbnail,
                                { borderColor: theme === 'dark' ? '#ffffff' : '#000000' }
                            ]}
                        >
                            <Image
                                source={background.src}
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
