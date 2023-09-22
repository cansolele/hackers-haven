import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

import nmap_icon from "./icons/nmap_icon.jpg";
import nikto_icon from "./icons/nikto_icon.png";
import rc_icon from "./icons/rc_icon.png";

import style from "./Aside.module.css";

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
      <IconButton
        sx={{
          ...styleButton("/report-creator"),
          marginTop: 0,
        }}
        onClick={() => handleButtonClick("/report-creator")}
      >
        <img className={style.nmap_icon} src={rc_icon} alt="rc icon" />
      </IconButton>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", color: "text.title" }}
      >
        Report Creator
      </Typography>
    </Box>
  );
};

export default Aside;
