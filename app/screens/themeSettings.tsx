import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import stylesGeneral from '../styles/general_styles'

const ThemeSettings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={[
            stylesGeneral.container,
            { backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5' }
        ]}>
            <Text
            >
                Current Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Button
                title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
                onPress={toggleTheme}
                color={theme === 'dark' ? '#bbb' : '#333'}
            />
        </View>
    );
};

export default ThemeSettings;
