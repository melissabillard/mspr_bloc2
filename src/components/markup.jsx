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
 * - `/forgot-password` → ForgotPassword
 * - `/home-authenticated` → AuthenticatedHome
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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signin from "../pages/Signin/Signin";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AuthenticatedHome from "../pages/AuthenticatedHome/AuthenticatedHome";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

// Composant pour gérer l'affichage conditionnel du Header et Footer
function ConditionalLayout({ children }) {
  const location = useLocation();

  // Pages qui doivent avoir le Header et Footer
  const pagesWithHeaderFooter = ["/"];

  // Pages qui ne doivent avoir ni Header ni Footer (ont leur propre layout)
  const pagesWithoutLayout = ["/home-authenticated"];

  // Pages qui doivent avoir le Header mais pas le Footer
  const pagesWithHeaderOnly = [];

  const showHeader =
    pagesWithHeaderFooter.includes(location.pathname) ||
    pagesWithHeaderOnly.includes(location.pathname);
  const showFooter = pagesWithHeaderFooter.includes(location.pathname);
  const showLayout = !pagesWithoutLayout.includes(location.pathname);

  if (!showLayout) {
    // Pages avec leur propre layout complet (comme AuthenticatedHome)
    return children;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <main className={`flex-grow ${showHeader ? "" : "pt-0"}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function Markup(props) {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home-authenticated" element={<AuthenticatedHome />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </ConditionalLayout>
      </BrowserRouter>
    </>
  );
}
