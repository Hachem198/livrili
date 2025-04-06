import React from "react";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Services } from "./pages/Services";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import "./index.css";
import { Toaster } from "sonner";
import { Packages } from "./pages/Packages";
import AvailablePackagesPage from "./pages/AvailablePackagesPage";
import { Profile } from "./pages/Profile";
import userStore from "./store/userStore/userStore";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  const { user } = userStore;
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/services" element={<Services></Services>}></Route>
          {user ? (
            <Route path="/packages" element={<Packages></Packages>}></Route>
          ) : (
            <Route path="/packages" element={<ErrorPage></ErrorPage>}></Route>
          )}
          {user ? (
            <Route
              path="/availablepacks"
              element={<AvailablePackagesPage></AvailablePackagesPage>}
            ></Route>
          ) : (
            <Route
              path="/availablepacks"
              element={<ErrorPage></ErrorPage>}
            ></Route>
          )}
          {user ? (
            <Route path="/profile" element={<Profile></Profile>}></Route>
          ) : (
            <Route path="/profile" element={<ErrorPage></ErrorPage>}></Route>
          )}
        </Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}

export default App;
