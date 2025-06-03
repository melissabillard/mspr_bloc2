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
 * - `*` → redirection vers Home
 *
 * Exemple :
 * ```jsx
 * <Markup />
 * ```
 */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Home from "../pages/Home";

export default function Markup(props) {
    return (
        <>
            <BrowserRouter basename={'/'}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}