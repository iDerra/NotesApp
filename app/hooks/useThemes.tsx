import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/themeUtils';

const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const getTheme = async () => {
            const loadedTheme = await loadTheme();
            setTheme(loadedTheme);
        };
        getTheme();
        }, []);

        const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await saveTheme(newTheme);
    };

    return { theme, toggleTheme };
};

export default useTheme;