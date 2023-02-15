import { createTheme } from "@mui/material/styles";
const Theme = ({ mode }) => {
  const Theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "dark" ? "#366096" : "#3f51b5",
      },
      secondary: {
        main: mode === "dark" ? "#24344d" : "#f50057",
      },
      background: {
        default: mode === "dark" ? "#192231" : "#fafafa",
        paper: mode === "dark" ? "#24344d" : "#fff",
      },
      text: {
        title: mode === "dark" ? "#FFF" : "#FFF",
      },
    },
  });
  return Theme;
};
export default Theme;
