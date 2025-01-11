import { Search } from "lucide-react";

const filters = [
    {
      name: "localisation",
      label: "Localisation",
      options: ["Toutes les localisations", "Paris", "Lyon", "Marseille"],
    },
    {
      name: "categorie",
      label: "Catégorie",
      options: ["Toutes les catégories", "Développement", "Design", "Gestion de projet"],
    },
    {
      name: "type_emploi",
      label: "Type d'emploi",
      options: ["Tous les types", "Temps plein", "Temps partiel", "Freelance", "Stage"],
    },
    {
      name: "organisation",
      label: "Organisation",
      options: ["Toutes les organisations", "Google", "Microsoft", "Apple"],
    },
  ];
  
  const Filters = ({ onFilterChange }) => {
    const handleFilterChange = (e) => {
      onFilterChange({ [e.target.name]: e.target.value });
    };
  
    return (
      <div className="w-64 bg-white p-6 border-r shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
  
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <input
              type="text"
              name="search"
              className="w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
              placeholder="Search jobs..."
              onChange={handleFilterChange}
            />
            <Search className="absolute left-0 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
  
        {filters.map((filter) => (
          <div className="mb-6" key={filter.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            <select
              name={filter.name}
              className="w-full p-2 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
              onChange={handleFilterChange}
            >
              {filter.options.map((option, index) => (
                <option key={index} value={option === filter.options[0] ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };

  export default Filters;