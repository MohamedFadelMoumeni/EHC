import React, { useState, useEffect } from "react";
import { carriere } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import FormSpontane from "../components/FormSpontane";


const Carriere = () => {
  const [currentView, setCurrentView] = useState("menu");
  const [selectedList, setSelectedList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/jobs");
        const data = await response.json();

        const jobOffers = data.filter((item) => item.jobType === "JOB");
        const internshipOffers = data.filter((item) => item.jobType === "INTERNSHIP");

        setJobs(jobOffers);
        setInternships(internshipOffers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const ListView = ({ items, onItemClick }) => (
    <div className="max-w-[1120px] mx-auto space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-[#168187] hover:shadow-md transition-all duration-300"
        >
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">{item.title}</h3>
          <p className="text-gray-600">{item.location}</p>
        </div>
      ))}
    </div>
  );

  const DetailView = ({ item }) => (
    <div className="max-w-[1120px] mx-auto">
      <div className="flex gap-6 items-center mb-12">
        <div>
          <p className="text-gray-600 text-lg">{item.location}</p>
          <p className="text-gray-600 text-sm">Référence : {item.reference}</p>
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-gray-700">{item.description}</p>

        {item.requirements && (
          <p className="text-lg leading-relaxed text-gray-700">
            <strong>Exigences :</strong> {item.requirements}
          </p>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentView("formulaire")}
            className="px-12 py-4 bg-[#168187] text-white rounded-lg hover:opacity-90 transition-all duration-300 text-lg font-semibold"
          >
            Postuler à cette offre
          </button>
        </div>
      </div>
    </div>
  );

  const Formulaire = ({ selectedItem }) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.target);

      try {
        await axios.post("http://localhost:8081/api/applications", formData);
        toast.success("Votre candidature a été envoyée avec succès !");
      } catch (error) {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-[1120px] mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="jobId" value={selectedItem?.id || ""} />

          {/* Display Job Reference */}
          <div className="mb-4">
            <label className="block mb-1 text-lg font-medium text-gray-700">Référence</label>
            <p className="text-lg text-gray-800 bg-gray-50 px-4 py-2 rounded-md shadow-sm border border-gray-200">
              {selectedItem?.reference || "Non spécifié"}
            </p>
          </div>

          {/* Display Job Title */}
          <div className="mb-4">
            <label className="block mb-1 text-lg font-medium text-gray-700">Titre du poste</label>
            <p className="text-lg text-gray-800 bg-gray-50 px-4 py-2 rounded-md shadow-sm border border-gray-200">
              {selectedItem?.title || "Non spécifié"}
            </p>
          </div>

          {/* Display Job Location */}
          <div className="mb-4">
            <label className="block mb-1 text-lg font-medium text-gray-700">Lieu</label>
            <p className="text-lg text-gray-800 bg-gray-50 px-4 py-2 rounded-md shadow-sm border border-gray-200">
              {selectedItem?.location || "Non spécifié"}
            </p>
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] focus:ring-1 focus:ring-[#168187] outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] focus:ring-1 focus:ring-[#168187] outline-none"
              required
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">CV (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] outline-none file:bg-[#168187] file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-[#168187]/90"
              required
            />
          </div>

          {/* Cover Letter Upload */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Lettre de motivation (PDF)</label>
            <input
              type="file"
              name="coverLetter"
              accept=".pdf"
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#168187] outline-none file:bg-[#168187] file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-[#168187]/90"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-12 py-2 rounded-lg text-lg font-semibold transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#168187] text-white hover:opacity-90"
              }`}
            >
              {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <section id="carriere" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <div className="relative bg-[#168187] rounded-xl">
          <div className="p-4 bg-white rounded-lg">
            <img
              src={carriere}
              alt="carriere"
              className="w-full h-full object-cover rounded-lg relative z-[5]"
            />
          </div>
        </div>
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Rejoignez EHC Groupe <br /> et Transformez l'Avenir
        </h2>
        <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
          Chez EHC Groupe, nous ne recherchons pas seulement des collaborateurs, mais des partenaires de réussite.
          Que vous soyez un expert chevronné ou un jeune diplômé passionné, votre talent et votre ambition trouveront un écho dans notre équipe.
          Ensemble, repoussons les limites, innovons et créons un avenir meilleur.
        </p>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => {
              setSelectedList(jobs);
              setCurrentView("list");
              toggleModal();
            }}
            className="text-left text-lg hover:text-[#168187] transition-colors"
          >
            Voir liste des offres ›
          </button>

          <button
            onClick={() => {
              setSelectedList(internships);
              setCurrentView("list");
              toggleModal();
            }}
            className="text-left text-lg hover:text-[#168187] transition-colors"
          >
            Voir liste des stages ›
          </button>

          <button
            onClick={() => {
              setCurrentView("formSpontane");
              toggleModal();
            }}
            className="text-left text-lg hover:text-[#168187] transition-colors"
          >
            Candidature spontanée ›
          </button>
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title={
          currentView === "list"
            ? selectedList === jobs
              ? "Offres d'Emploi Actuelles"
              : "Stages Disponibles"
            : currentView === "detail"
            ? selectedItem.title
            : "Formulaire de candidature"

        }
      >
        {currentView === "list" && <ListView items={selectedList} onItemClick={(item) => {
          setSelectedItem(item);
          setCurrentView("detail");
        }} />}
        {currentView === "detail" && <DetailView item={selectedItem} />}
        {currentView === "formulaire" && <Formulaire selectedItem={selectedItem} />}
        {currentView === "formSpontane" && <FormSpontane/>}
      </Modal>
    </section>
  );
};

export default Carriere;
