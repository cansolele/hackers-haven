import { createTheme } from "@mui/material/styles";
const Theme = ({ mode }) => {
  const Theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: mode === "dark" ? "#444654" : "#fff",
        paper: mode === "dark" ? "#343541" : "#3f51b5",
      },
    },
  });
  return Theme;
};
export default Theme;
