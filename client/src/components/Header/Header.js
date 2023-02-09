import style from "./Header.module.css";
import { FaQuestion } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import hh_logo from "./hh_logo.svg";

const Header = ({ mode, setMode }) => {
  const [modalWindow, setModalWindow] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const titles = {
    "/": "HACKER'S HAVEN",
    "/nmap": "NMAP",
    "/nikto": "NIKTO",
  };
  const toggleColorMode = () => {
    mode === "dark" ? setMode("light") : setMode("dark");
  };
  const handleSubmit = async () => {
    const url = "http://192.168.54.38:5000/about";
    const payload = {
      tool: location.pathname,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const data = await response.text();
    setModalDescription(data);
    setModalWindow(true);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }} className={style.header}>
      <button onClick={() => navigate("/")} className={style.mp_btn}>
        <img src={hh_logo} alt="hh_logo" className={style.hh_logo} />
      </button>

      <h1 className={style.tool_name}>{titles[location.pathname]}</h1>
      <IconButton
        sx={{ mr: "50px", position: "absolute", right: 0 }}
        onClick={toggleColorMode}
        color="inherit"
      >
        {mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon htmlColor="white" />
        )}
      </IconButton>
      <button onClick={handleSubmit} className={style.button_help}>
        <FaQuestion className={style.button_help_icon} />
      </button>
      <div
        className={`${style.modalContainer} ${
          modalWindow ? style.modalActive : ""
        }`}
      >
        <div className={style.modalWindow}>
          <div className={style.btnCancelContainer}>
            <button
              className={style.cancelModalBtn}
              onClick={() => setModalWindow(false)}
            >
              <IconContext.Provider
                value={{ className: style.cancelModalBtnIcon }}
              >
                <ImCancelCircle />
              </IconContext.Provider>
            </button>
          </div>
          <div className={style.textModal}>{modalDescription}</div>
        </div>
      </div>
    </Box>
  );
};
export default Header;
