import React from "react";
import { Users, Shield, Zap } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function Features() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cofrap-text mb-4">
            Fonctionnalités
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Les outils essentiels pour gérer vos utilisateurs et services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-cofrap-secondary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cofrap-primary" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Gestion des utilisateurs
              </CardTitle>
              <CardDescription>
                Gérez facilement vos utilisateurs avec des outils intuitifs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-cofrap-mint" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Sécurité
              </CardTitle>
              <CardDescription>
                Protection de vos données avec des protocoles de sécurité
                avancés
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-cofrap-light rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-cofrap-accent" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Performance
              </CardTitle>
              <CardDescription>
                Interface rapide et réactive pour une expérience optimale
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;
