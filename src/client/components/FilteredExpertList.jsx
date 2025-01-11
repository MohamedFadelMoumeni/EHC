
// FilteredExpertList.jsx
import { useEffect, useState } from "react";
import { UserSquare2 } from "lucide-react";
import axios from "axios";

const EXPERT_CATEGORIES = [
  { value: "ALL", label: "Tous les experts" },
  { value: "CONSULTING", label: "Consulting" },
  { value: "RECRUITMENT", label: "Recrutement" },
  { value: "LEARNING", label: "Formation" },
  { value: "SERVICE_AND_EVENT", label: "Service & Événements" },
  { value: "ENGINEERING", label: "Ingénierie" }
];


const ExpertCard = ({ name, title, bio, expertise, education, languages, seniority, image }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="bg-white text-left rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex-shrink-0">
            <img
              src={image || "/api/placeholder/100/100"}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#168187]"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-[#168187] font-medium">{title}</p>
          </div>
        </div>
  
        {isOpen && (
          <div className="mt-4 pl-20 space-y-3 text-gray-700">
            {bio && <p className="text-gray-600 break-words">{bio}</p>}
  
            <div className="space-y-2">
              {expertise && (
                <div>
                  <span className="font-semibold">Expertises : </span>
                  <span>{expertise}</span>
                </div>
              )}
  
              {education && (
                <div>
                  <span className="font-semibold">Formation : </span>
                  <span>{education}</span>
                </div>
              )}
  
              {languages && (
                <div>
                  <span className="font-semibold">Langues : </span>
                  <span>{languages}</span>
                </div>
              )}
  
              {seniority && (
                <div>
                  <span className="font-semibold">Expérience : </span>
                  <span>{seniority} ans</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };


export const FilteredExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filteredExperts, setFilteredExperts] = useState([]);

  useEffect(() => {
    // Fetch experts data
    axios
      .get("http://localhost:8081/api/experts")
      .then((response) => {
        const transformedExperts = response.data.map((expert) => ({
          name: expert.fullName,
          title: expert.function,
          bio: expert.biography,
          expertise: expert.expertises,
          education: expert.education,
          languages: expert.languages,
          seniority: expert.seniority,
          category: expert.expertCategory,
          image: `http://localhost:8081/api/uploads/experts/${expert.imagePath}`,
        }));
        setExperts(transformedExperts);
        setFilteredExperts(transformedExperts);
      })
      .catch((error) => {
        console.error("Error fetching experts:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredExperts(experts);
    } else {
      setFilteredExperts(experts.filter(expert => expert.category === selectedCategory));
    }
  }, [selectedCategory, experts]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <UserSquare2 size={24} style={{ color: '#168187' }} />
            <h2 className="text-xl font-bold" style={{ color: '#168187' }}>
              Nos experts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="text-gray-700">Filtrer par catégorie:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#168187]"
            >
              {EXPERT_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-6">
          {filteredExperts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </div>
      </div>
    </div>
  );
};