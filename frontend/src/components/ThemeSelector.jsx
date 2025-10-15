import React from 'react';
import { Moon, Sun, Palette, Code } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = ({ language, onLanguageChange }) => {
    const { theme, toggleTheme } = useTheme();

    const languages = [
        { value: 'javascript', label: 'JavaScript', icon: '{}' },
    ];

    const themes = [
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'light', label: 'Light', icon: Sun },
        // { value: 'green', label: 'Green', icon: Palette },
        // { value: 'blue', label: 'Blue', icon: Palette },
    ];

    return (
        <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-text-secondary" />
                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="bg-bg-primary border border-border-color text-text-primary px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 min-w-40"
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.icon} {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center gap-2">
                <div className="flex gap-1 bg-bg-primary border border-border-color rounded-lg p-1">
                    {themes.map((themeOption) => {
                        const Icon = themeOption.icon;
                        return (
                            <button
                                key={themeOption.value}
                                onClick={() => toggleTheme(themeOption.value)}
                                className={`p-2 rounded-md transition duration-200 flex items-center gap-1 ${theme === themeOption.value
                                        ? themeOption.value === 'green'
                                            ? 'bg-green-500 text-white'
                                            : themeOption.value === 'blue'
                                                ? 'bg-indigo-500 text-white'
                                                : themeOption.value === 'light'
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-gray-700 text-white'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                                    }`}
                                title={themeOption.label}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
