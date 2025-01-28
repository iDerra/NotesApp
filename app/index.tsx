import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

export default function MainApp() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
