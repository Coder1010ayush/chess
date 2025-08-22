// components/ThemeWrapper.jsx
import { useTheme } from '../themecontext/ThemeContext';

export const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme}`} style={{
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)',
        }}>
            {children}
        </div>
    );
};