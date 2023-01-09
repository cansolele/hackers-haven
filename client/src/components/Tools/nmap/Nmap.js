import style from "./Nmap.module.css";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Nmap = ({
  inputAddress,
  setInputAddress,
  flags,
  setFlags,
  output,
  setOutput,
}) => {
  const handleSubmit = async () => {
    const response = await fetch("http://192.168.31.181:5000/run-nmap", {
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
    <div className={style.nmap}>
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
      <TextField
        label="Nmap output:"
        multiline
        value={output}
        variant="filled"
        className={style.output}
        InputProps={{
          readOnly: true,
        }}
        maxRows={20}
      />
      <Button onClick={handleSave} variant="contained" endIcon={<SaveIcon />}>
        SAVE
      </Button>
      <Accordion className={style.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={style.accordion_summary}
        >
          <p>Nmap Scan Techniques</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sS")}
                    onChange={() => handleFlagChange("-sS")}
                  />
                }
                label="-sS"
              />
              <p>TCP SYN port scan (Default)</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sT")}
                    onChange={() => handleFlagChange("-sT")}
                  />
                }
                label="-sT"
              />
              <p>TCP connect port scan (Default without root privilege)</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sU")}
                    onChange={() => handleFlagChange("-sU")}
                  />
                }
                label="-sU"
              />
              <p>UDP port scan</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sA")}
                    onChange={() => handleFlagChange("-sA")}
                  />
                }
                label="-sA"
              />
              <p>TCP ACK port scan</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sW")}
                    onChange={() => handleFlagChange("-sW")}
                  />
                }
                label="-sW"
              />
              <p>TCP Window port scan</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sM")}
                    onChange={() => handleFlagChange("-sM")}
                  />
                }
                label="-sM"
              />
              <p>TCP Maimon port scan</p>
            </div>
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion className={style.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={style.accordion_summary}
        >
          <p>Host Discovery</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sL")}
                    onChange={() => handleFlagChange("-sL")}
                  />
                }
                label="-sL"
              />
              <p>No Scan. List targets only</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-sn")}
                    onChange={() => handleFlagChange("-sn")}
                  />
                }
                label="-sn"
              />
              <p>Disable port scanning. Host discovery only</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-Pn")}
                    onChange={() => handleFlagChange("-Pn")}
                  />
                }
                label="-Pn"
              />
              <p>Disable host discovery. Port scan only</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-PS")}
                    onChange={() => handleFlagChange("-PS")}
                  />
                }
                label="-PS"
              />
              <p>TCP SYN discovery on port x.Port 80 by default</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-PA")}
                    onChange={() => handleFlagChange("-PA")}
                  />
                }
                label="-PA"
              />
              <p>TCP ACK discovery on port x.Port 80 by default</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-PU")}
                    onChange={() => handleFlagChange("-PU")}
                  />
                }
                label="-PU"
              />
              <p>UDP discovery on port x.Port 40125 by default</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-PR")}
                    onChange={() => handleFlagChange("-PR")}
                  />
                }
                label="-PR"
              />
              <p>ARP discovery on local network</p>
            </div>
            <div className={style.flags_container}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={flags.includes("-n")}
                    onChange={() => handleFlagChange("-n")}
                  />
                }
                label="-n"
              />
              <p>Never do DNS resolution</p>
            </div>
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p>Port Specification</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-P")}
                  onChange={() => handleFlagChange("-P")}
                />
              }
              label="-P"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-F")}
                  onChange={() => handleFlagChange("-F")}
                />
              }
              label="-F"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("–top-ports")}
                  onChange={() => handleFlagChange("–top-ports")}
                />
              }
              label="–top-ports"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-p-65535")}
                  onChange={() => handleFlagChange("-p-65535")}
                />
              }
              label="-p-65535"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p>Service and Version Detection</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-sV")}
                  onChange={() => handleFlagChange("-sV")}
                />
              }
              label="-sV"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-sV –version-intensity")}
                  onChange={() => handleFlagChange("-sV –version-intensity")}
                />
              }
              label="-sV –version-intensity"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-sV –version-light")}
                  onChange={() => handleFlagChange("-sV –version-light")}
                />
              }
              label="-sV –version-light"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-sV –version-all")}
                  onChange={() => handleFlagChange("-sV –version-all")}
                />
              }
              label="-sV –version-all"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-A")}
                  onChange={() => handleFlagChange("-A")}
                />
              }
              label="-A"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p>OS Detection</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-O")}
                  onChange={() => handleFlagChange("-O")}
                />
              }
              label="-O"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-O –osscan-limit")}
                  onChange={() => handleFlagChange("-O –osscan-limit")}
                />
              }
              label="-O –osscan-limit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-O –osscan-guess")}
                  onChange={() => handleFlagChange("-O –osscan-guess")}
                />
              }
              label="-O –osscan-guess"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-O –max-os-tries")}
                  onChange={() => handleFlagChange("-O –max-os-tries")}
                />
              }
              label="-O –max-os-tries"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-A")}
                  onChange={() => handleFlagChange("-A")}
                />
              }
              label="-A"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <p>Timing and Performance</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T0")}
                  onChange={() => handleFlagChange("-T0")}
                />
              }
              label="-T0"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T1")}
                  onChange={() => handleFlagChange("-T1")}
                />
              }
              label="-T1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T2")}
                  onChange={() => handleFlagChange("-T2")}
                />
              }
              label="-T2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T3")}
                  onChange={() => handleFlagChange("-T3")}
                />
              }
              label="-T3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T4")}
                  onChange={() => handleFlagChange("-T4")}
                />
              }
              label="-T4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-T5")}
                  onChange={() => handleFlagChange("-T5")}
                />
              }
              label="-T5"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion> */}
      <h1>
        nmap {inputAddress} {flags.join(" ")}
      </h1>
    </div>
  );
};

export default Nmap;
