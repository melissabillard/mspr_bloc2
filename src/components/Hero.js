import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="w-full pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-cofrap-text mb-6">
          Gérez vos services avec
          <span className="bg-gradient-to-r from-cofrap-primary to-cofrap-accent bg-clip-text text-transparent">
            {" "}
            COFRAP
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Plateforme de gestion d'utilisateurs et de services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signin">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cofrap-primary to-cofrap-accent hover:from-purple-800 hover:to-purple-400 px-8 py-3 text-lg"
            >
              Commencer
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-cofrap-accent text-cofrap-primary hover:bg-cofrap-light"
            >
              Se connecter
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
