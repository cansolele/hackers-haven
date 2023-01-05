import style from "./Nmap.module.css";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";

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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={flags.includes("-sL")}
              onChange={() => handleFlagChange("-sL")}
              title="This flag specifies a list scan"
            />
          }
          label="-sL"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={flags.includes("-sn")}
              onChange={() => handleFlagChange("-sn")}
            />
          }
          label="-sn"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={flags.includes("-Pn")}
              onChange={() => handleFlagChange("-Pn")}
            />
          }
          label="-Pn"
        />
      </FormGroup>
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
    </div>
  );
};

export default Nmap;
