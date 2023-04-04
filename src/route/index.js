import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";

function RouteNavigation() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default RouteNavigation;
