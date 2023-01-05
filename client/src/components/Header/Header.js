import style from "./Header.module.css";
import { FaQuestion } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";

const Header = () => {
  const [modalWindow, setModalWindow] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const location = useLocation();
  const titles = {
    "/": "HACKER'S HAVEN",
    "/nmap": "NMAP",
    "/nikto": "NIKTO",
  };
  const handleSubmit = async () => {
    const url = "http://192.168.31.181:5000/about";
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
    <div className={style.header}>
      <h1 className={style.tool_name}>{titles[location.pathname]}</h1>
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
    </div>
  );
};
export default Header;
