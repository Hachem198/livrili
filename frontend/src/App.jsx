import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route path="/" element={<Home></Home>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
