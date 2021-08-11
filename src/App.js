import React, { useState, lazy, Suspense, useContext } from "react";
import "./App.css";
//import OftadehRoutes from "./components/OftadehRoutes/OftadehRoutes";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./oftadeh-configs/themeConfig";
import ThemeContext from "./context/ThemeContext/ThemeContext";
import {AuthProvider} from "./context/ Authentication/authState";
//import AuthContext from "./context/ Authentication/authContext";

const OftadehRoutes = lazy( ()=> import("./components/OftadehRoutes/OftadehRoutes") )

const App = () => {
  
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
        <Suspense fallback={null}>
            <AuthProvider>
                <ThemeContext.Provider value={{ setThemeName, curThemeName }}>
                    <ThemeProvider theme={theme}>
                        <div className="App">
                            <OftadehRoutes />
                        </div>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </AuthProvider>
        </Suspense>
    );
};

export default App;
