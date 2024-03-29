import React, { useState, useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ExploitsTable from "./ExploitTable";
import FileHistory from "./FileHistory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import style from "./ReportCreator.module.css";

const ReportCreator = React.memo(({ currentLanguage }) => {
  const [exploitTableKeys, setExploitTableKeys] = useState([0]);

  const addExploitTable = useCallback(() => {
    setExploitTableKeys((prevKeys) => [...prevKeys, prevKeys.length]);
  }, []);

  const handleRemoveExploitTable = (keyToRemove) => {
    if (exploitTableKeys.length > 1) {
      setExploitTableKeys((prevKeys) =>
        prevKeys.filter((key) => key !== keyToRemove)
      );
    }
  };

  return (
    <Box className={style.report_creator}>
      {exploitTableKeys.map((key, index) => (
        <ExploitsTable
          key={key}
          currentLanguage={currentLanguage}
          onRemove={() => handleRemoveExploitTable(key)}
          isRemovable={index > 0}
        />
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
