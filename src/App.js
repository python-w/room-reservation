import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import Listing from "../src/pages/Listing";
import { RoomsProvider } from "./contexts/RoomsContext";
import ListItemWrapper from './ListItems'
import ReservationSummary from "./pages/ReservationSummary";


function App() {

  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <RoomsProvider>
          <Search />
          {/* <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            const items = Array.from({ length: 24 }, (_, index) => `List Item ${index + 1}`);
            <ListItemWrapper items={items} />
          </div> */}
          {/* <Listing /> */}
          <ReservationSummary />
        </RoomsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
