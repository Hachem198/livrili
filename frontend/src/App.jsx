import React from "react";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
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
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          <Route
            path="/packages"
            element={userStore.user ? <Packages /> : <Navigate to="/login" />}
          />
          <Route
            path="/availablepacks"
            element={
              userStore.user ? (
                <AvailablePackagesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={userStore.user ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
});

export default App;
