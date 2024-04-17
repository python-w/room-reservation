import "./index.css";
import "./custom.scss";
import RoomDetails from "../src/pages/RoomDetails";
import Confirmation from "../src/pages/Confirmation";
import { SearchProvider } from "./contexts/SearchContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReservationSummary, {
  action as bookingAction,
} from "./pages/ReservationSummary";
import RoomListing from "./pages/Listing";
import Index from "./pages/Index";

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
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </div>
  );
}

export default App;
