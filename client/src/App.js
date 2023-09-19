import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Nikto from "./components/Tools/nikto/Nikto";
import Nmap from "./components/Tools/nmap/Nmap";
import ReportCreator from "./components/Tools/report-creator/ReportCreator";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

const App = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "ENG"
  );
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  return (
    <ThemeProvider theme={Theme({ mode })}>
      <CssBaseline />
      <Box className="app">
        <Header
          mode={mode}
          setMode={setMode}
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
