import { GraduationCap, Settings, Users, Award } from 'lucide-react';

const services = [
  {
    icon: <GraduationCap className="text-4xl" />,
    title: "Conception et ingénierie de formation",
    description: "Nous travaillons en étroite collaboration avec nos clients pour concevoir des formations parfaitement alignées sur leurs besoins. De l'analyse des compétences clés à l'élaboration des contenus."
  },
  {
    icon: <Settings className="text-4xl" />,
    title: "Formations standard et sur-mesure",
    description: "Notre catalogue propose une large gamme de formations standard et des solutions sur-mesure adaptées aux contextes et enjeux spécifiques de chaque organisation."
  },
  {
    icon: <Users className="text-4xl" />,
    title: "Déploiement et accompagnement",
    description: "Accompagnement complet avec des méthodes pédagogiques modernes incluant l'apprentissage en présentiel, à distance ou hybride."
  },
  {
    icon: <Award className="text-4xl" />,
    title: "Éligibilité CSF",
    description: "En tant qu'organisme agréé, nous vous aidons à maximiser votre ROI en formation via les Contrats Spéciaux de Formation (CSF)."
  }
];

export default function LrServices() {
  return (
    <section id ="services_learning" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">Nos Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition group flex flex-col h-full">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform h-16 flex items-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 h-20 flex items-center">{service.title}</h3>
              <p className="text-gray-600 text-justify flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}