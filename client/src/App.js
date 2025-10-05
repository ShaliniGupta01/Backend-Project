import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";

import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Form from "./Components/Form/Form";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Home page shows Records & Form */}
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          {/* Create Record Form page */}
          <Route
            path="/create"
            element={user ? <Form /> : <Navigate to="/login" />}
          />

          {/* Auth Pages */}
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />

          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to={user ? "/home" : "/login"} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



