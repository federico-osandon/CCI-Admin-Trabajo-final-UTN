import React, {useState} from 'react'
import getTheme from "../../oftadeh-configs/themeConfig";
import ThemeContext from './ThemeContext'


function ThemeContextProvider({children}) {
    const curThemeName = localStorage.getItem("appTheme") || "light";

    const [themeType, setThemeType] = useState(curThemeName);

    const setThemeName = themeName => {
        localStorage.setItem("appTheme", themeName);
        setThemeType(themeName);
    };

    const theme = getTheme({
        paletteType: themeType
    });

    return (
        <ThemeContext.Provider value={{ 
                setThemeName,
                curThemeName,
                theme 
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
