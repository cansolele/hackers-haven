import style from "./Aside.module.css";
import nmap_icon from "./nmap_icon.jpg";
import nikto_icon from "./nikto_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getButtonClass = (path) => {
    if (location.pathname === path) {
      return `${style.tool_select} ${style.tool_select_active}`;
    }
    return style.tool_select;
  };
  return (
    <div className={style.aside}>
      <button
        onClick={() => navigate("/nmap")}
        className={getButtonClass("/nmap")}
      >
        <img className={style.nmap_icon} src={nmap_icon} alt="nmap icon" />
        <p>nmap</p>
      </button>
      <button
        onClick={() => navigate("/nikto")}
        className={getButtonClass("/nikto")}
      >
        <img className={style.nmap_icon} src={nikto_icon} alt="nikto icon" />
        <p>nikto</p>
      </button>
    </div>
  );
};

export default Aside;
