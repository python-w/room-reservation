import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import RoomDetails from "../src/pages/RoomDetails";
import { SearchProvider, useSearch } from "./contexts/SearchContext";
import ListItemWrapper from './ListItems'
import ReservationSummary from "./pages/ReservationSummary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />
  },
  {
    path: '/room/:roomId',
    element: <RoomDetails />
  },
  {
    path: '/reservation-suummary',
    element: <ReservationSummary />
  }
])
function App() {
  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
