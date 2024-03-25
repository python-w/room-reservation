import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import Listing from "../src/pages/Listing";
import RoomDetails from "../src/pages/RoomDetails";
import { SearchProvider, useSearch } from "./contexts/SearchContext";
import ListItemWrapper from './ListItems'
import ReservationSummary from "./pages/ReservationSummary";


function App() {
  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <SearchProvider>
          <Search />
          <Listing />
          {/* <RoomDetails /> */}
          {/* <ReservationSummary /> */}
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
