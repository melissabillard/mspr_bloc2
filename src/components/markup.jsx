/**
 * Composant Markup
 *
 * Point d'entrée principal de la navigation de l'application.
 * Configure les routes avec React Router et associe chaque URL à une page.
 *
 * Routes définies :
 * - `/` → Home
 * - `/signin` → Signin
 * - `/login` → Login
 * - `/dashboard` → Dashboard
 * - `*` → redirection vers Home
 *
 * Exemple :
 * ```jsx
 * <Markup />
 * ```
 */

/**
 * Composant de pied de page
 *
 * Affiche des informations légales ou de contact en bas de page.
 *
 * Exemple :
 * ```jsx
 * <Footer />
 * ```
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Login from "../pages/Login/Login";
import Signin from "../pages/Signin/Signin";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";

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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}
