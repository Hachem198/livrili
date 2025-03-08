import React from "react";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Services } from "./pages/Services";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/services" element={<Services></Services>}></Route>
      </Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
  );
}

export default App;
