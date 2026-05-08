import { Provider } from "react-redux";

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { store } from "./redux/store";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/UserDashboard";

import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ChangePassword from "./Components/ChangePassword";

function App() {

  return (
    <Provider store={store}>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/admin-dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/userdashboard"
            element={<UserDashboard />}
          />

        </Routes>

      </BrowserRouter>

    </Provider>
  );
}

export default App;
