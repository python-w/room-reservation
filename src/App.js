import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import Listing from "../src/pages/Listing";
import RoomDetail from "../src/pages/RoomDetail";
import { SearchProvider } from "./contexts/SearchContext";
import ListItemWrapper from './ListItems'
import ReservationSummary from "./pages/ReservationSummary";
import { RoomsProvider } from "./contexts/RoomsContext";


function App() {
  // const items = Array.from({ length: 24 }, (_, index) => `List Item ${index + 1}`);

  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <SearchProvider>
          <RoomsProvider>
            {/* <Search /> */}
            {/* <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <ListItemWrapper items={items} />
          </div> */}
            <Listing />
            {/* <ReservationSummary /> */}
          </RoomsProvider>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
