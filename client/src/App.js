import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Nikto from "./components/KaliTools/nikto/Nikto";
import Nmap from "./components/KaliTools/nmap/Nmap";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const [inputNmapAddress, setInputNmapAddress] = useState("");
  const [nmapFlags, setNmapFlags] = useState([]);
  const [nmapOutput, setNmapOutput] = useState("");
  return (
    <div className="app">
      <Header />
      <Aside />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/nmap"
          element={
            <Nmap
              inputAddress={inputNmapAddress}
              setInputAddress={setInputNmapAddress}
              flags={nmapFlags}
              setFlags={setNmapFlags}
              output={nmapOutput}
              setOutput={setNmapOutput}
            />
          }
        />
        <Route path="/nikto" element={<Nikto />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
