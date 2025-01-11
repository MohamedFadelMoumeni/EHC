import React from 'react';
import { Building2, Cpu, BarChart3, ArrowRight } from 'lucide-react';

const services = [
 {
   icon: Building2,
   title: "Management des organisations",
   description: "Optimisation des processus internes, gestion du changement et développement des compétences managériales pour une meilleure cohésion et efficacité.",
   features: ["Optimisation des processus", "Gestion du changement", "Formation managériale"]
 },
 {
   icon: Cpu,
   title: "Digitalisation",
   description: "Intégration des technologies avancées pour améliorer votre productivité et répondre aux exigences de l'ère numérique.",
   features: ["Transformation digitale", "Solutions sur mesure", "Innovation technologique"]
 },
 {
   icon: BarChart3,
   title: "Performance globale",
   description: "Amélioration continue de la performance organisationnelle avec des outils et indicateurs adaptés à vos objectifs.",
   features: ["KPIs personnalisés", "Analyse de données", "Optimisation continue"]
 }
];

export default function Services() {
 return (
   <section id="solutions_consulting" className="py-24 bg-gray-50" >
     <div className="container mx-auto px-6">
       <div className="max-w-3xl mx-auto text-center mb-16">
         <h2 className="text-4xl font-bold mb-6 animate-scale">Nos domaines d'intervention</h2>
         <p className="text-lg text-gray-600 animate-fade-up">
           Des solutions complètes et personnalisées pour répondre à vos enjeux stratégiques
         </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {services.map((service, index) => (
           <div 
             key={index}
             className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-up hover-scale"
             style={{ animationDelay: `${index * 200}ms` }}
           >
             <div className="p-8 flex flex-col h-full">
               <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                 <service.icon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-xl font-bold mb-4">{service.title}</h3>
               <p className="text-gray-600 mb-6 text-justify">{service.description}</p>
               <ul className="space-y-3 mt-auto">
                 {service.features.map((feature, i) => (
                   <li key={i} className="flex items-center text-gray-600">
                     <ArrowRight size={16} className="text-primary mr-2 flex-shrink-0" />
                     <span className="text-gray-600">{feature}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         ))}
       </div>
     </div>
   </section>
 );
}