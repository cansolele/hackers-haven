import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DownloadIcon from "@mui/icons-material/Download";

import style from "./ReportCreator.module.css";
import config from "../../../config";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ReportCreator = React.memo(({ currentLanguage }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [tableLanguage, setTableLanguage] = useState("ENG");

  const handleFileChange = useCallback(({ target }) => {
    setFile(target.files[0]);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tableLanguage", tableLanguage);

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
        setDownloadLink(null);
      }

      setIsLoading(false);
    },
    [file, tableLanguage]
  );
  return (
    <Box className={style.report_creator}>
      <Typography variant="h4">
        {currentLanguage === "ENG"
          ? "Create exploits table"
          : "Создать таблицу c эксплоитами"}
      </Typography>
      <Typography>
        {currentLanguage === "ENG"
          ? "Upload report in .xml(only RedCheck) or .pdf(results may be less accurate) format"
          : "Загрузите отчет в формате .xml или .pdf (результаты могут быть менее точными)"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl disabled>
          <FormLabel id="scanner select">
            {currentLanguage === "ENG"
              ? "Select Vulnerability Scanner"
              : "Выберите сканер уязвимостей"}
          </FormLabel>
          <RadioGroup defaultValue="REDCheck">
            <FormControlLabel
              value="REDCheck"
              control={<Radio />}
              label="REDCheck"
            />
            <FormControlLabel
              value="Max Patrol"
              control={<Radio />}
              label="Max Patrol"
            />
            <FormControlLabel
              value="Nexpose"
              control={<Radio />}
              label="Nexpose"
            />
            <FormControlLabel
              value="Acunetix"
              control={<Radio />}
              label="Acunetix"
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="tableLanguage">
            {currentLanguage === "ENG" ? "Language table" : "Язык таблицы"}
          </InputLabel>
          <Select
            value={tableLanguage}
            label="Language table"
            onChange={(e) => setTableLanguage(e.target.value)}
          >
            <MenuItem value={"ENG"}>
              {currentLanguage === "ENG" ? "English" : "Английский"}
            </MenuItem>
            <MenuItem value={"RUS"}>
              {currentLanguage === "ENG" ? "Russian" : "Русский"}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={isLoading}
        >
          {currentLanguage === "ENG" ? "Upload" : "Загрузить"}
          <VisuallyHiddenInput
            type="file"
            accept=".xml, .pdf"
            onChange={handleFileChange}
          />
        </Button>
        <Button
          type="submit"
          disabled={!file || isLoading}
          variant="contained"
          endIcon={isLoading ? <HourglassBottomIcon /> : <SendIcon />}
        >
          {isLoading
            ? currentLanguage === "ENG"
              ? "Processing..."
              : "Обработка..."
            : currentLanguage === "ENG"
            ? "Process"
            : "Обработать"}
        </Button>
      </form>
      {!isLoading && downloadLink && (
        <Button
          onClick={() => (window.location.href = downloadLink)}
          type="button"
          variant="contained"
          endIcon={<DownloadIcon />}
        >
          {currentLanguage === "ENG" ? "Download table" : "Скачать таблицу"}
        </Button>
      )}
    </Box>
  );
});

export default ReportCreator;
