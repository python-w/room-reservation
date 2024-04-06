import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Search from "./features/search/Search";
import CustomTheme from "./customTheme";
import RoomDetails from "../src/pages/RoomDetails";
import Confirmation from "../src/pages/Confirmation";
import { SearchProvider } from "./contexts/SearchContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReservationSummary, { action as bookingAction } from "./pages/ReservationSummary";

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
    element: <ReservationSummary />,
    action: bookingAction
  },
  {
    path: '/bookings',
    element: <Confirmation />,
  },
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
