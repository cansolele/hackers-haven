import style from "./Aside.module.css";
import nmap_icon from "./nmap_icon.jpg";
import nikto_icon from "./nikto_icon.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
    <Box sx={{ bgcolor: "background.paper" }} className={style.aside}>
      <button
        onClick={() => navigate("/nmap")}
        className={getButtonClass("/nmap")}
      >
        <img className={style.nmap_icon} src={nmap_icon} alt="nmap icon" />
        <Typography color="white">nmap</Typography>
      </button>
      <button
        onClick={() => navigate("/nikto")}
        className={getButtonClass("/nikto")}
      >
        <img className={style.nmap_icon} src={nikto_icon} alt="nikto icon" />
        <Typography color="white">nikto</Typography>
      </button>
    </Box>
  );
};

export default Aside;
