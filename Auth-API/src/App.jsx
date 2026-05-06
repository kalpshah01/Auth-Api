import { Provider } from "react-redux";

import "./App.css";

import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import UserDashboard from "./Components/UserDashboard";

import { store } from "./redux/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {  
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/userdashboard" element={<UserDashboard />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
