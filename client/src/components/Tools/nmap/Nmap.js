import style from "./Nmap.module.css";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Nmap = ({
  inputAddress,
  setInputAddress,
  flags,
  setFlags,
  output,
  setOutput,
}) => {
  const handleSubmit = async () => {
    const response = await fetch("http://192.168.54.38:5000/run-nmap", {
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
      <div>
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

        <FormGroup sx={{ color: "text.secondary" }}>
          <div className={style.flags_container}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.includes("-sC")}
                  onChange={() => handleFlagChange("-sC")}
                />
              }
              label="-sC"
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
                  checked={flags.includes("-A")}
                  onChange={() => handleFlagChange("-A")}
                />
              }
              label="-A"
            />
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
        <h1>
          nmap {inputAddress} {flags.join(" ")}
        </h1>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Nmap;
