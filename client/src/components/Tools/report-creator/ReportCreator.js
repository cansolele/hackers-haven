import style from "./ReportCreator.module.css";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";

const ReportCreator = ({ currentLanguage }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${config.apiURL}/make-exploits-table`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
    setDownloadLink(null);
  };
  return (
    <Box className={style.report_creator}>
      <h1>{currentLanguage === "ENG" ? "Create table" : "Сделать таблицу"}</h1>
      <p>
        {currentLanguage === "ENG"
          ? "Upload report in .xml(only RedCheck) or .pdf(results may be less accurate) format"
          : "Загрузите отчет в формате .xml(только RedCheck) или .pdf (результаты могут быть менее точными)"}
      </p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xml, .pdf" onChange={handleFileChange} />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading
            ? currentLanguage === "ENG"
              ? "Processing..."
              : "Обработка..."
            : currentLanguage === "ENG"
            ? "Process"
            : "Обработать"}
        </button>
      </form>
      {downloadLink && (
        <a href={downloadLink}>
          {currentLanguage === "ENG" ? "Download table" : "Скачать таблицу"}
        </a>
      )}
    </Box>
  );
};

export default ReportCreator;
