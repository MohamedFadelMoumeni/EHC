import { useState } from "react";
import { close, menu, logo } from "../../assets";


const navLinks = [
  {
    id: "accueil",
    title: "Accueil",
  },
 
  {
    id: "actualites",
    title: "Actualités",
    submenu: [
      { id: "#actualites", title: "Événements en Cours" },
      { id: "#actualites", title: "Prochains Événements" },
    ]
  },

  {
    id: "apropos",
    title: "À Propos",
    submenu: [
      {title: "Message du Directeur Général",path:'/message-directeur' },
      { id: "structure", title: "Structure Organisationnelle" },
      { id: "#apropos", title: "Unités Stratégiques" },
    ]
  },
  {
    id: "services",
    title: "Services",
    submenu: [
      { id: "#services", title: "Solutions pour Étudiants" },
      { id: "#services", title: "Services aux Employés" },
      { id: "#services", title: "Offres pour Entreprises" },
    ]
  },
  {
    id: "medias",
    title: "Médias",
    submenu: [
      { id: "/media", title: "Publications" },
      { id: "/media", title: "Contenus Vidéo" },
      { id: "/media", title: "Podcasts" },
    ]
  },
  {
    id: "carriere",
    title: "Carrière",
    submenu: [
      { id: "/careerInterface", title: "Postes Disponibles" },
      { id: "/careerInterface", title: "Partenariats Recrutement" },
      { id: "/careerInterface", title: "Candidature Libre" },
    ]
  },
  {
    id: "references",
    title: "Références",
    submenu: [
      { id: "#references", title: "Nos Réference" },
      { id: "#clients", title: "Témoignages" },
      
    ]
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "paiment",
    title: "Paiement",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("Accueil");
  const [toggle, setToggle] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuClick = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <nav className="w-full flex py-4 justify-between items-center navbar bg-white shadow-sm">
      <div className="flex items-center">
        <img src={logo} alt="EHC" className="w-[200px] h-[40px] object-contain" />
      </div>

      {/* Desktop Navigation */}
      <ul className="list-none hidden lg:flex items-center flex-1 justify-end">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className="relative group px-4"
            onMouseEnter={() => handleSubmenuClick(nav.id)}
            onMouseLeave={() => handleSubmenuClick(null)}
          >
            <a
              href={`#${nav.id}`}
              className={`font-semibold text-[15px] hover:text-[#168187] transition-colors duration-300 flex items-center ${
                active === nav.title ? "text-[#168187]" : "text-black"
              }`}
              onClick={() => setActive(nav.title)}
            >
              {nav.title}
              {nav.submenu && (
                <svg
                  className={`w-4 h-4 ml-1 ${active === nav.title ? "text-[#168187]" : "text-black"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </a>

            {nav.submenu && openSubmenu === nav.id && (
              <ul className="absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 z-50">
                {nav.submenu.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`${item.id || item.path}`}
                      className="block px-4 py-2 text-sm text-black hover:bg-[#168187]/5 hover:text-[#168187]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-end items-center">
        <button
          onClick={() => setToggle(!toggle)}
          className="text-[#168187]"
        >
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 cursor-pointer"
          />
        </button>

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl shadow-lg sidebar z-50`}
        >
          <ul className="list-none flex flex-col justify-end items-start gap-4">
            {navLinks.map((nav) => (
              <li key={nav.id} className="w-full">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleSubmenuClick(nav.id)}
                    className="flex items-center justify-between w-full text-black hover:text-[#168187]"
                  >
                    {nav.title}
                    {nav.submenu && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === nav.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {nav.submenu && openSubmenu === nav.id && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {nav.submenu.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`${item.id}`}
                            className="block text-sm text-black hover:text-[#168187]"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
  
};

export default Navbar;