import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import MultiStepForm from "./pages/MultiStepForm";
import { NoPage } from "./pages/NoPage";
import Navbar from "./components/Navbar";
const App = () => {
  console.log("Rendering App component");

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/login-form" element={<MultiStepForm />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
