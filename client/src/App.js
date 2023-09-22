import React, { useState, useEffect, lazy, Suspense } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Theme from "./Theme";

const MainPage = lazy(() => import("./components/MainPage/MainPage"));
const Nikto = lazy(() => import("./components/Tools/nikto/Nikto"));
const Nmap = lazy(() => import("./components/Tools/nmap/Nmap"));
const ReportCreator = lazy(() =>
  import("./components/Tools/report-creator/ReportCreator")
);

const App = () => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "dark"
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem("language") || "ENG"
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
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
        <Footer currentLanguage={currentLanguage} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
