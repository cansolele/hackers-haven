import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";

import Theme from "./Theme";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";

const MainPage = lazy(() => import("./components/MainPage/MainPage"));
const Nikto = lazy(() => import("./components/Tools/nikto/Nikto"));
const Nmap = lazy(() => import("./components/Tools/nmap/Nmap"));
const ReportCreator = lazy(() =>
  import("./components/Tools/report-creator/ReportCreator")
);

const App = () => {
  // Initial mode state
  const [initialMode, setInitialMode] = useState(
    () => localStorage.getItem("mode") || "dark"
  );

  // Initial language state
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem("language") || "ENG"
  );

  // Update mode in local storage
  useEffect(() => {
    localStorage.setItem("mode", initialMode);
  }, [initialMode]);

  // Update language in local storage
  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  return (
    <ThemeProvider theme={Theme({ mode: initialMode })}>
      <CssBaseline />
      <Box className="app">
        <Header
          mode={initialMode}
          setMode={setInitialMode}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />
        <Aside />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/nmap"
            element={<Nmap currentLanguage={currentLanguage} />}
          />
          <Route
            path="/nikto"
            element={<Nikto currentLanguage={currentLanguage} />}
          />
          <Route
            path="/report-creator"
            element={<ReportCreator currentLanguage={currentLanguage} />}
          />
        </Routes>
        <Footer currentLanguage={currentLanguage} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
