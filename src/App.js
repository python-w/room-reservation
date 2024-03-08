import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import Listing from "../src/pages/Listing";

function App() {
  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <Listing />
      </ThemeProvider>
    </div>
  );
}

export default App;
