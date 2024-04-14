import "./index.css";
import "./custom.scss";
import { ThemeProvider } from "@mui/material/styles";
import { Alert, CssBaseline } from "@mui/material";
import CustomTheme from "./customTheme";
import RoomDetails from "../src/pages/RoomDetails";
import Confirmation from "../src/pages/Confirmation";
import { SearchProvider } from "./contexts/SearchContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReservationSummary, {
  action as bookingAction,
} from "./pages/ReservationSummary";
import RoomListing from "./pages/Listing";
import Index from "./pages/Index";
import SearchComponent from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/searchresults",
    element: <RoomListing />,
  },
  {
    path: "/room/:roomId",
    element: <RoomDetails />,
  },
  {
    path: "/reservation-summary",
    element: <ReservationSummary />,
    action: bookingAction,
  },
  {
    path: "/bookings",
    element: <Confirmation />,
  },
]);
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
