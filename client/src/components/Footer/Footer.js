import React from "react";
import style from "./Footer.module.css";

const Footer = ({ currentLanguage }) => {
  return (
    <div className={style.footer}>
      {(currentLanguage === "ENG" ? "Viktor Sh." : "Виктор Ш. ") +
        "Mail: shvs@cbi-info.ru. 2023"}{" "}
    </div>
  );
};

export default Footer;
