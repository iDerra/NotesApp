import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import stylesGeneral from '../styles/general_styles';
import sytlesTheme from '../styles/theme_styles';
import { Switch } from 'react-native-switch';

const ThemeSettings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={[
            stylesGeneral.container,
            { backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5' }
        ]}>
            <View style={[
                sytlesTheme.containerThemes,
                { backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }
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
    );
};

export default ThemeSettings;
