import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('code-editor-theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('code-editor-theme', theme);
        document.documentElement.className = `theme-${theme}`;

        const root = document.documentElement;

        if (theme === 'green') {
            root.style.setProperty('--bg-primary', '#052e16');
            root.style.setProperty('--bg-secondary', '#14532d');
            root.style.setProperty('--text-primary', '#dcfce7');
            root.style.setProperty('--text-secondary', '#bbf7d0');
            root.style.setProperty('--border-color', '#22c55e');
        }
        else if (theme === 'light') {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f5f5f5');
            root.style.setProperty('--text-primary', '#171717');
            root.style.setProperty('--text-secondary', '#525252');
            root.style.setProperty('--border-color', '#d4d4d4');
        }
        else if (theme === 'blue') {
            // 🌊 Blue / Indigo theme
            root.style.setProperty('--bg-primary', '#1e1b4b');      // deep indigo background
            root.style.setProperty('--bg-secondary', '#312e81');    // medium indigo tone
            root.style.setProperty('--text-primary', '#e0e7ff');    // soft light text
            root.style.setProperty('--text-secondary', '#c7d2fe');  // lighter indigo text
            root.style.setProperty('--border-color', '#6366f1');    // indigo-500 border
        }
        else {
            // Default dark
            root.style.setProperty('--bg-primary', '#0a0a0a');
            root.style.setProperty('--bg-secondary', '#171717');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#a3a3a3');
            root.style.setProperty('--border-color', '#404040');
        }
    }, [theme]);

    const toggleTheme = (newTheme) => setTheme(newTheme);

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
