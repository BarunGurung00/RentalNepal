import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";  // Correct the path to ./pages/Home
import SignUpPage from "./pages/SgnIn";  // Correct the path to ./pages/SignIn
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import PostCar from "./pages/PostCar";  // Correct the path to ./pages/PostCar
import VehicleListing from "./pages/VehicleListing";  // Correct the path to ./pages/VehicleListing
import MyBooking from "./pages/MyBooking";  // Correct the path to ./pages/MyBooking
import NotFound from "./pages/NotFound";  // Correct the path to ./pages/NotFound

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignUpPage />} />
        <Route path="/Search" element={
          <ProtectedRoute> 
            <Search /> 
          </ProtectedRoute>} 
        />
        <Route path="/Profile" element={
           <ProtectedRoute> 
             <Profile />
           </ProtectedRoute>} 
        />
        <Route path="/profile/mybooking" element={<MyBooking />} />
        <Route path="/profile/vehiclelisting" element={<VehicleListing />} />
        <Route path="/profile/PostCar" element={<PostCar />} />

        {/* Catch-all route at the bottom */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
