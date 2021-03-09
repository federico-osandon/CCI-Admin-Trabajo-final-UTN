import React, { useState, lazy, Suspense } from "react";
import "./App.css";
//import OftadehRoutes from "./components/OftadehRoutes/OftadehRoutes";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./oftadeh-configs/themeConfig";
import ThemeContext from "./context/ThemeContext/ThemeContext";
import {AuthProvider} from "./context/ Authentication/authState";

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
    <AuthProvider>
      <ThemeContext.Provider value={{ setThemeName, curThemeName }}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={null}>
            <div className="App">
              <OftadehRoutes />
            </div>
          </Suspense>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;
