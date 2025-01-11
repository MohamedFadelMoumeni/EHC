import { Users, BriefcaseIcon, Trophy } from "lucide-react";
import { useState } from "react";





const ExpertsMain = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-6">
        {/* Présentation générale */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users size={24} style={{ color: '#168187' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#168187' }}>
                EHC Groupe - Nos Experts
              </h2>
            </div>
            <p className="text-gray-600">
              Chez <span className="font-bold">EHC Groupe</span>, nous avons réuni une équipe d'experts hautement qualifiés et passionnés par leur métier. Grâce à leurs compétences diversifiées et leur expérience éprouvée, nos experts vous accompagnent dans vos projets avec professionnalisme et engagement.
            </p>
          </div>
        </div>

        {/* Domaines d'expertise */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseIcon size={24} style={{ color: '#168187' }} />
              <h2 className="text-xl font-bold" style={{ color: '#168187' }}>
                Un savoir-faire multidisciplinaire
              </h2>
            </div>
            <ul className="space-y-2">
              {[
                "Coaching personnel et professionnel",
                "Gestion des ressources humaines et stratégie organisationnelle",
                "Formation et développement des compétences",
                "Évaluation psychologique et bilans de compétences",
                "Gestion des risques émergents et innovation RH",
              ].map((domain, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#168187' }} />
                  <span className="text-gray-700">{domain}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      
        {/* Pourquoi nous choisir */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={24} style={{ color: '#168187' }} />
              <h2 className="text-xl font-bold" style={{ color: '#168187' }}>
                Pourquoi nous choisir ?
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Expérience avérée",
                  description: "Nos professionnels disposent d'années d'expérience dans des secteurs variés.",
                },
                {
                  title: "Approche personnalisée",
                  description: "Chaque solution est adaptée à vos besoins spécifiques.",
                },
                {
                  title: "Engagement pour l'excellence",
                  description: "Nous mettons un point d'honneur à vous offrir des prestations de qualité supérieure.",
                },
              ].map((reason, index) => (
                <div key={index}
                     className="p-4 rounded-lg"
                     style={{ backgroundColor: 'rgba(22, 129, 135, 0.1)' }}>
                  <h3 className="font-bold" style={{ color: '#168187' }}>{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertsMain;