import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const contactInfo = [
    { icon: MapPin, text: "Avenue des Événements, Casablanca" },
    { icon: Phone, text: "+212 6 66 78 90 12" },
    { icon: Mail, text: "events@expertshumancapital.com" }
  ];

  const sections = [
    {
      title: "Liens rapides",
      links: [
        { text: "À propos", href: "#aproposevents" },
        { text: "Services", href: "#events-service" },
        { text: "Contact", href: "#contact_events" }
      ]
    },
    {
      title: "Nos services",
      links: [
        { text: "Organisation d'Événements sur Mesure", href: "#events-service" },
        { text: "Gestion de Projets Clés en Main", href: "#events-service" },
        { text: "Services d'Accompagnement", href: "#events-service" },
        { text: "Solutions Innovantes et Digitales", href: "#events-service" },
        { text: "Services aux Entreprises", href: "#events-service" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">EHC Services & Events</h3>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <item.icon className="mt-1 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Suivez-nous</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="transition-colors hover:text-white"
                  aria-label={`Visit our ${link.icon.name}`}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EHC Services & Events. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;