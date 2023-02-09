import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Nikto from "./components/Tools/nikto/Nikto";
import Nmap from "./components/Tools/nmap/Nmap";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

const App = () => {
  const [mode, setMode] = useState("dark");
  return (
    <ThemeProvider theme={Theme({ mode })}>
      <CssBaseline />
      <Box className="app">
        <Header mode={mode} setMode={setMode} />
        <Aside />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/nmap" element={<Nmap />} />
          <Route path="/nikto" element={<Nikto />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
