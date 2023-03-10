import style from "./Nmap.module.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import config from "../../../config";

const Nmap = () => {
  const [inputAddress, setInputAddress] = useState(
    localStorage.getItem("addressNMAP") || ""
  );
  const [flags, setFlags] = useState(
    JSON.parse(localStorage.getItem("flagsNMAP")) || []
  );
  const [output, setOutput] = useState(
    localStorage.getItem("outputNMAP") || ""
  );
  useEffect(() => {
    localStorage.setItem("addressNMAP", inputAddress);
  }, [inputAddress]);
  useEffect(() => {
    localStorage.setItem("flagsNMAP", JSON.stringify(flags));
  }, [flags]);
  useEffect(() => {
    localStorage.setItem("outputNMAP", output);
  }, [output]);
  const handleSubmit = async () => {
    const response = await fetch(`${config.apiURL}/run-nmap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flags: flags, ip: inputAddress }),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      setOutput(decoder.decode(value, { stream: true }));
    }
  };
  const handleSave = () => {
    const file = new Blob([output], { type: "text/plain" });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.download = "nmap_output.txt";
    link.href = fileURL;
    link.click();
  };

  const handleFlagChange = (flag) => {
    if (flags.includes(flag)) {
      setFlags(flags.filter((o) => o !== flag));
    } else {
      setFlags([...flags, flag]);
    }
  };
  return (
    <Box className={style.nmap}>
      <Box className={style.input_container}>
        <TextField
          value={inputAddress}
          required={true}
          onChange={(e) => setInputAddress(e.target.value)}
          label="Address"
          variant="standard"
          helperText="example: scanme.nmap.org or 192.168.30.1/24"
        />

        <Button
          onClick={async () => {
            await handleSubmit();
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Start
        </Button>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Nmap Scan Techniques</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup sx={{ color: "text.secondary" }}>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sS")}
                      onChange={() => handleFlagChange("-sS")}
                    />
                  }
                  label="-sS"
                />
                <Typography>TCP SYN port scan (Default)</Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sT")}
                      onChange={() => handleFlagChange("-sT")}
                    />
                  }
                  label="-sT"
                />
                <Typography>
                  TCP connect port scan (Default without root privilege)
                </Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sU")}
                      onChange={() => handleFlagChange("-sU")}
                    />
                  }
                  label="-sU"
                />
                <Typography>UDP port scan</Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sA")}
                      onChange={() => handleFlagChange("-sA")}
                    />
                  }
                  label="-sA"
                />
                <Typography>TCP ACK port scan</Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sW")}
                      onChange={() => handleFlagChange("-sW")}
                    />
                  }
                  label="-sW"
                />
                <Typography>TCP Window port scan</Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sM")}
                      onChange={() => handleFlagChange("-sM")}
                    />
                  }
                  label="-sM"
                />
                <Typography>TCP Maimon port scan</Typography>
              </Box>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Host Discovery</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup sx={{ color: "text.secondary" }}>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sL")}
                      onChange={() => handleFlagChange("-sL")}
                    />
                  }
                  label="-sL"
                />
                <Typography>No Scan. List targets only</Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-sn")}
                      onChange={() => handleFlagChange("-sn")}
                    />
                  }
                  label="-sn"
                />
                <Typography>
                  Disable port scanning. Host discovery only.
                </Typography>
              </Box>
              <Box className={style.flags_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flags.includes("-Pn")}
                      onChange={() => handleFlagChange("-Pn")}
                    />
                  }
                  label="-Pn"
                />
                <Typography>Disable host discovery. Port scan only.</Typography>
              </Box>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className={style.output_container}>
        <TextField
          label="Nmap output:"
          sx={{
            "& .MuiFormLabel-root": {
              fontSize: "30px",
            },
            "& .MuiInputBase-root": {
              paddingTop: "40px",
            },
          }}
          multiline
          value={output}
          variant="filled"
          className={style.output}
          InputProps={{
            readOnly: true,
          }}
          rows={20}
          maxRows={20}
        />
        <Button onClick={handleSave} variant="contained" endIcon={<SaveIcon />}>
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default Nmap;
