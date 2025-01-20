import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundProvider } from './context/BackgroundContext';
import App from './App';

export default function MainApp() {
    return (
        <BackgroundProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BackgroundProvider>
    );
}
