import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import RoomDetails from "../src/pages/RoomDetails";
import Bookings from "../src/pages/Bookings";
import { SearchProvider } from "./contexts/SearchContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoomsProvider } from "./contexts/RoomsContext";
import ReservationSummary from "./pages/ReservationSummary";

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
    path: '/reservation-summary',
    element: <ReservationSummary />
  },
  {
    path: '/bookings',
    element: <Bookings />,
  },
])
function App() {
  return (
    <div className="webc-container">
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <SearchProvider>
          <RoomsProvider>
            <RouterProvider router={router} />
          </RoomsProvider>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
