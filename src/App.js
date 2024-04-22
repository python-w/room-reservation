import "./index.css";
import "./custom.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomDetails from "../src/pages/RoomDetails";
import Confirmation from "../src/pages/Confirmation";
import { SearchProvider } from "./contexts/SearchContext";
import ReservationSummary, {
  action as bookingAction,
} from "./pages/ReservationSummary";
import RoomListing from "./pages/Listing";
import Index from "./pages/Index";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/searchresults" element={<RoomListing />} />
      <Route path="/room/:roomId" element={<RoomDetails />} />
      <Route path="/reservation-summary" element={<ReservationSummary />} />
      <Route path="/bookings" element={<Confirmation />} />
      {/* Define other routes here */}
    </Routes>
  </Router>
);

function App() {
  return (
    <div className="webc-container">
      <div className="container">
        <SearchProvider>
          {router}
        </SearchProvider>
      </div>
    </div>
  );
}

export default App;
