import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Change from "./pages/Change";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/change" element={<Change />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
