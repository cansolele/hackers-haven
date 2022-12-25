import style from "./Header.module.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const titles = {
    "/": "WEB KALI TOOLS",
    "/nmap": "NMAP",
    "/nikto": "NIKTO",
  };
  return (
    <div className={style.header}>
      <h1 className={style.tool_name}>{titles[location.pathname]}</h1>
    </div>
  );
};
export default Header;
