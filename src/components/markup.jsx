import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Home from "../pages/Home";
import Header from "./Header";
import Footer from "./Footer";

export default function Markup(props) {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}
