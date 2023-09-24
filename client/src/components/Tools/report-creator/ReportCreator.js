import React, { useState, useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ExploitsTable from "./ExploitTable";
import FileHistory from "./FileHistory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import style from "./ReportCreator.module.css";

const ReportCreator = React.memo(({ currentLanguage }) => {
  const [exploitTableKeys, setExploitTableKeys] = useState([]);

  const addExploitTable = useCallback(() => {
    setExploitTableKeys((prevKeys) => [...prevKeys, prevKeys.length]);
  }, []);

  return (
    <Box className={style.report_creator}>
      <ExploitsTable currentLanguage={currentLanguage} />
      {exploitTableKeys.map((key) => (
        <ExploitsTable key={key} currentLanguage={currentLanguage} />
      ))}
      <Box className={style.add_exploit_table_container}>
        <IconButton onClick={addExploitTable}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Typography>
          {currentLanguage === "ENG"
            ? "Create exploits table"
            : "Создать ещё таблицу"}
        </Typography>
      </Box>

      <FileHistory currentLanguage={currentLanguage} />
    </Box>
  );
});

export default ReportCreator;
