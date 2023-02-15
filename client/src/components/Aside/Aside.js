import style from "./Aside.module.css";
import nmap_icon from "./nmap_icon.jpg";
import nikto_icon from "./nikto_icon.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";

const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    navigate(buttonId);
  };

  const styleButton = (path) => ({
    width: "70px",
    height: "70px",
    padding: 0,
    borderRadius: 0,
    margin: "10px auto",
    marginBottom: 0,
    ...(activeButton === path && {
      border: "3px solid",
      borderColor: "secondary.main",
    }),
  });

  return (
    <Box sx={{ bgcolor: "primary.main" }} className={style.aside}>
      <IconButton
        sx={{
          ...styleButton("/nmap"),
          marginTop: 0,
        }}
        onClick={() => handleButtonClick("/nmap")}
      >
        <img className={style.nmap_icon} src={nmap_icon} alt="nmap icon" />
      </IconButton>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", color: "text.title" }}
      >
        Nmap
      </Typography>
      <IconButton
        sx={{
          ...styleButton("/nikto"),
        }}
        onClick={() => handleButtonClick("/nikto")}
      >
        <img className={style.nmap_icon} src={nikto_icon} alt="nikto icon" />
      </IconButton>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", color: "text.title" }}
      >
        Nikto
      </Typography>
    </Box>
  );
};

export default Aside;
