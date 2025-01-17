import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const listener = ({ colorScheme }) => {
            setTheme(colorScheme || 'light');
        };

        const subscription = Appearance.addChangeListener(listener);

        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
