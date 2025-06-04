import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function CTA() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-r from-cofrap-primary to-cofrap-accent">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Prêt à commencer ?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Commencez à gérer vos utilisateurs et services dès maintenant
        </p>
        <Link to="/signin">
          <Button
            size="lg"
            className="bg-white text-cofrap-primary hover:bg-gray-50 hover:text-cofrap-accent px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-transparent hover:border-white"
          >
            Créer un compte
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CTA;
