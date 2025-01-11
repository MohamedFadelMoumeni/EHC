// import React, { useState, useEffect } from 'react';
// import { MapPin, ArrowRight, Building, Users, Send, ChevronRight } from 'lucide-react';
// import { toast } from 'react-toastify';
// const mainColor = '#168187';

// const CareersInterface = () => {
//   const [activeTab, setActiveTab] = useState('our-positions');
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showApplicationForm, setShowApplicationForm] = useState(false);
//   const [positionType, setPositionType] = useState('JOB');
//   const [jobs, setJobs] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('http://localhost:8081/api/jobs');
//         const data = await response.json();
//         setJobs(data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         toast.error('Erreur lors du chargement des offres');
//       }
//     };
//     fetchJobs();
//   }, []);

//   const filteredJobs = jobs.filter(job => {
//     return (
//       (activeTab === 'our-positions' ? job.jobSource === 'OUR_JOB' : job.jobSource === 'PARTNER_JOB') &&
//       job.jobType === positionType
//     );
//   });

//   const TabButton = ({ id, icon, label, active }) => (
//     <button
//       onClick={() => {
//         setActiveTab(id);
//         setSelectedJob(null);
//         setShowApplicationForm(false);
//       }}
//       className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
//         active ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
//       }`}
//       style={active ? { backgroundColor: mainColor } : {}}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );

//   const TypeToggle = () => (
//     <div className="flex space-x-4 mb-6">
//       <button
//         onClick={() => {
//           setPositionType('JOB');
//           setSelectedJob(null);
//         }}
//         className={`px-6 py-2 rounded-lg text-white transition-all ${
//           positionType === 'JOB' ? 'bg-opacity-100 shadow-md' : 'bg-opacity-70'
//         }`}
//         style={{ backgroundColor: mainColor }}
//       >
//         Temps Plein
//       </button>
//       <button
//         onClick={() => {
//           setPositionType('INTERNSHIP');
//           setSelectedJob(null);
//         }}
//         className={`px-6 py-2 rounded-lg text-white transition-all ${
//           positionType === 'INTERNSHIP' ? 'bg-opacity-100 shadow-md' : 'bg-opacity-70'
//         }`}
//         style={{ backgroundColor: mainColor }}
//       >
//         Stage
//       </button>
//     </div>
//   );

//   const handleJobApplication = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData(e.target);
//     formData.append('jobId', selectedJob.id.toString());

//     try {
//       const response = await fetch('http://localhost:8081/api/applications', {
//         method: 'POST',
//         body: formData
//       });
      
//       if (response.ok) {
//         toast.success('Candidature envoyée avec succès!');
//         setShowApplicationForm(false);
//       } else {
//         throw new Error('Erreur de soumission');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Erreur lors de l\'envoi de la candidature');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSpontaneousApplication = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData(e.target);

//     try {
//       const response = await fetch('http://localhost:8081/api/Spontaneous-applications', {
//         method: 'POST',
//         body: formData
//       });
      
//       if (response.ok) {
//         toast.success('Candidature spontanée envoyée avec succès!');
//         e.target.reset();
//       } else {
//         throw new Error('Erreur de soumission');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Erreur lors de l\'envoi de la candidature');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const JobDetails = ({ job }) => (
//     <div className="bg-white rounded-lg p-8 shadow-lg">
//       <div className="mb-6">
//         <button
//           onClick={() => {
//             setSelectedJob(null);
//             setShowApplicationForm(false);
//           }}
//           className="text-gray-600 hover:text-gray-800 flex items-center space-x-2 transition-colors"
//         >
//           <ArrowRight className="rotate-180" size={16} />
//           <span>Retour aux offres</span>
//         </button>
//       </div>

//       {!showApplicationForm ? (
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-3xl font-bold mb-4" style={{ color: mainColor }}>
//               <div className="flex-shrink-0">
//                 <img
//                   src={`http://localhost:8081/api/uploads/jobs/${job.imagePath}`}
//                   alt={job.title}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-[#168187]"
//                 />
//               </div>
//               {job.title}
//             </h2>
//             <div className="flex items-center space-x-4 text-gray-600">
//               <div className="flex items-center space-x-1">
//                 <MapPin size={16} />
//                 <span>{job.location}</span>
//               </div>
//               <span>•</span>
//               <span>{job.jobType === "JOB" ? "Temps plein" : "Stage"}</span>
//               {job.partnerName && (
//                 <>
//                   <span>•</span>
//                   <span>{job.partnerName}</span>
//                 </>
//               )}
//               <span>•</span>
//               {job.jobCategory}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>Description du Poste</h3>
//             <p className="line-break text-gray-600 leading-relaxed">{job.description}</p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>Prérequis</h3>
//             <p className="line-break text-gray-600 leading-relaxed">{job.requirements}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 italic">Ref : {job.reference}</p>
//           </div>

//           <button
//             onClick={() => setShowApplicationForm(true)}
//             className="w-full py-3 text-white rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-md"
//             style={{ backgroundColor: mainColor }}
//           >
//             <span>Postuler Maintenant</span>
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h3 className="text-2xl font-bold mb-6" style={{ color: mainColor }}>Formulaire de Candidature</h3>
//           <form className="space-y-6" onSubmit={handleJobApplication}>
//             <div className="space-y-2">
//               <label className="block text-sm font-medium" style={{ color: mainColor }}>Nom Complet</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium" style={{ color: mainColor }}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium" style={{ color: mainColor }}>Téléphone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium" style={{ color: mainColor }}>CV (PDF)</label>
//               <input
//                 type="file"
//                 name="resume"
//                 className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                 accept=".pdf"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium" style={{ color: mainColor }}>Lettre de Motivation (PDF)</label>
//               <input
//                 type="file"
//                 name="coverLetter"
//                 className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                 accept=".pdf"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="flex flex-col space-y-4 mt-8">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: mainColor }}
//               >
//                 {isLoading ? 'Envoi en cours...' : 'Envoyer la Candidature'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowApplicationForm(false)}
//                 disabled={isLoading}
//                 className="w-full py-3 rounded-full transition-colors text-gray-600 hover:bg-gray-100 disabled:opacity-50"
//               >
//                 Retour aux Détails du Poste
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold mb-6" style={{ color: mainColor }}>Donnez Vie à Vos Ambitions</h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Vous êtes talentueux et ambitieux ? Rejoignez une équipe où chaque expertise compte.
//               Chez nous, vos idées façonnent l'avenir et votre potentiel n'a pas de limites.
//               Ensemble, créons des solutions qui transforment le monde.
//             </p>
//           </div>

//           <div className="flex space-x-4 mb-8 border-b pb-4">
//             <TabButton
//               id="our-positions"
//               icon={<Building size={20} />}
//               label="Postes Internes"
//               active={activeTab === 'our-positions'}
//             />
//             <TabButton
//               id="partner-positions"
//               icon={<Users size={20} />}
//               label="Offres Partenaires"
//               active={activeTab === 'partner-positions'}
//             />
//             <TabButton
//               id="spontaneous"
//               icon={<Send size={20} />}
//               label="Candidature Spontanée"
//               active={activeTab === 'spontaneous'}
//             />
//           </div>

//           {activeTab === 'spontaneous' ? (
//             <div className="w-full mx-auto">
//               <div className="bg-white rounded-lg p-8 shadow-lg">
//                 <p className="text-gray-800 text-lg mb-8 leading-relaxed text-center">
//                   Votre talent nous intéresse ! Même si nous n'avons pas de poste correspondant à votre profil actuellement,
//                   nous sommes toujours à l'affût des meilleurs talents. Envoyez-nous votre candidature et nous vous
//                   recontacterons pour les opportunités à venir.
//                 </p>

//                 <form className="space-y-6" onSubmit={handleSpontaneousApplication}>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium" style={{ color: mainColor }}>Nom Complet</label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium" style={{ color: mainColor }}>Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium" style={{ color: mainColor }}>CV (PDF)</label>
//                     <input
//                       type="file"
//                       name="resume"
//                       className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                       accept=".pdf"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium" style={{ color: mainColor }}>Lettre de Motivation (PDF)</label>
//                     <input
//                       type="file"
//                       name="coverLetter"
//                       className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
//                       accept=".pdf"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="flex flex-col space-y-4 mt-8">
//                     <button
//                       type="submit"
//                       disabled={isLoading}
//                       className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                       style={{ backgroundColor: mainColor }}
//                     >
//                       {isLoading ? 'Envoi en cours...' : 'Envoyer la Candidature'}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <>
//               <TypeToggle />
//               {selectedJob ? (
//                 <JobDetails job={selectedJob} />
//               ) : (
//                 <div className="grid gap-6">
//                   {filteredJobs.map((position) => (
//                     <div key={position.id} className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
//                       <div className="flex flex-col justify-between h-full">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center space-x-2">
//                             <div className="flex-shrink-0">
//                               <img
//                                 src={`http://localhost:8081/api/uploads/jobs/${position.imagePath}`}
//                                 alt={position.title}
//                                 className="w-16 h-16 rounded-full object-cover border-2 border-[#168187] mr-2"
//                               />
//                             </div>
//                             {position.title}
//                           </h3>
//                           <div className="flex items-center space-x-4 text-gray-600 mb-4">
//                             {position.partnerName && (
//                               <>
//                                 <span>{position.partnerName}</span>
//                                 <span>•</span>
//                               </>
//                             )}
//                             <div className="flex items-center space-x-1">
//                               <MapPin size={16} />
//                               <span>{position.location}</span>
//                             </div>
//                             <span>•</span>
//                             <span>{position.jobType === "JOB" ? "Temps plein" : "Stage"}</span>
//                             <span>•</span>
//                             <span>{position.jobCategory}</span>
//                           </div>
//                           <p className="line-break text-gray-600 mb-4 line-clamp-3">{position.description}</p>
//                         </div>

//                         <button
//                           onClick={() => setSelectedJob(position)}
//                           className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-all shadow-md"
//                           style={{ backgroundColor: mainColor }}
//                         >
//                           <span>Voir les Détails</span>
//                           <ArrowRight size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareersInterface;


import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Building, Users, Send, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const mainColor = '#168187';

// Custom animations CSS
const AnimationStyles = () => (
  <style>{`
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .animate-slideDown {
      animation: slideDown 0.5s ease-out;
    }

    .animate-slideUp {
      animation: slideUp 0.5s ease-out;
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }

    .animate-slideIn {
      animation: slideIn 0.5s ease-out;
    }

    .hover-scale {
      transition: transform 0.2s ease-in-out;
    }

    .hover-scale:hover {
      transform: scale(1.05);
    }
  `}</style>
);

const CareersInterface = () => {
  const [activeTab, setActiveTab] = useState('our-positions');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [positionType, setPositionType] = useState('JOB');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Erreur lors du chargement des offres');
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      (activeTab === 'our-positions' ? job.jobSource === 'OUR_JOB' : job.jobSource === 'PARTNER_JOB') &&
      job.jobType === positionType
    );
  });

  const handleJobApplication = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append('jobId', selectedJob.id.toString());

    try {
      const response = await fetch('http://localhost:8081/api/applications', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        toast.success('Candidature envoyée avec succès!');
        setShowApplicationForm(false);
      } else {
        throw new Error('Erreur de soumission');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'envoi de la candidature');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpontaneousApplication = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:8081/api/Spontaneous-applications', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        toast.success('Candidature spontanée envoyée avec succès!');
        e.target.reset();
      } else {
        throw new Error('Erreur de soumission');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'envoi de la candidature');
    } finally {
      setIsLoading(false);
    }
  };

  const JobDetails = ({ job }) => (
    <div className="bg-white rounded-lg p-8 shadow-lg animate-slideUp">
      <div className="mb-6">
        <button
          onClick={() => {
            setSelectedJob(null);
            setShowApplicationForm(false);
          }}
          className="text-gray-600 hover:text-gray-800 flex items-center space-x-2 transition-colors hover-scale"
        >
          <ArrowRight className="rotate-180" size={16} />
          <span>Retour aux offres</span>
        </button>
      </div>

      {!showApplicationForm ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center space-x-4" style={{ color: mainColor }}>
              <div className="flex-shrink-0">
                <img
                  src={`http://localhost:8081/api/uploads/jobs/${job.imagePath}`}
                  alt={job.title}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#168187] hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span>{job.title}</span>
            </h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <span>•</span>
              <span>{job.jobType === "JOB" ? "Temps plein" : "Stage"}</span>
              {job.partnerName && (
                <>
                  <span>•</span>
                  <span>{job.partnerName}</span>
                </>
              )}
              <span>•</span>
              <span>{job.jobCategory}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>
              Description du Poste
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>
              Prérequis
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </p>
          </div>

          <div>
            <p className="text-gray-500 italic">Ref : {job.reference}</p>
          </div>

          <button
            onClick={() => setShowApplicationForm(true)}
            className="w-full py-3 text-white rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all hover-scale shadow-md"
            style={{ backgroundColor: mainColor }}
          >
            <span>Postuler Maintenant</span>
            <ChevronRight size={20} />
          </button>
        </div>
      ) : (
        <div className="animate-slideUp">
          <h3 className="text-2xl font-bold mb-6" style={{ color: mainColor }}>
            Formulaire de Candidature
          </h3>
          <form className="space-y-6" onSubmit={handleJobApplication}>
            {/* Form fields will be in Part 2 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>
                Nom Complet
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>
                CV (PDF)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>
                Lettre de Motivation (PDF)
              </label>
              <input
                type="file"
                name="coverLetter"
                accept=".pdf"
                className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all hover-scale shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: mainColor }}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer la Candidature'}
              </button>
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                disabled={isLoading}
                className="w-full py-3 rounded-full transition-colors text-gray-600 hover:bg-gray-100 disabled:opacity-50 hover-scale"
              >
                Retour aux Détails du Poste
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const TabButton = ({ id, icon, label, active }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSelectedJob(null);
        setShowApplicationForm(false);
      }}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all hover-scale ${
        active ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
      }`}
      style={active ? { backgroundColor: mainColor } : {}}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const TypeToggle = () => (
    <div className="flex justify-center space-x-4 mb-6 animate-fadeIn">
      <button
        onClick={() => {
          setPositionType('JOB');
          setSelectedJob(null);
        }}
        className={`px-6 py-2 rounded-lg text-white transition-all hover-scale ${
          positionType === 'JOB' ? 'bg-opacity-100 shadow-md' : 'bg-opacity-70'
        }`}
        style={{ backgroundColor: mainColor }}
      >
        Temps Plein
      </button>
      <button
        onClick={() => {
          setPositionType('INTERNSHIP');
          setSelectedJob(null);
        }}
        className={`px-6 py-2 rounded-lg text-white transition-all hover-scale ${
          positionType === 'INTERNSHIP' ? 'bg-opacity-100 shadow-md' : 'bg-opacity-70'
        }`}
        style={{ backgroundColor: mainColor }}
      >
        Stage
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimationStyles />
      <div className="p-8 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h1 
              className="text-5xl font-bold animate-slideDown" 
              style={{ color: mainColor }}
            >
              Donnez Vie à Vos Ambitions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slideUp">
              Vous êtes talentueux et ambitieux ? Rejoignez une équipe où chaque expertise compte.
              Chez nous, vos idées façonnent l'avenir et votre potentiel n'a pas de limites.
              Ensemble, créons des solutions qui transforment le monde.
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8 border-b pb-4 animate-fadeIn">
            <TabButton
              id="our-positions"
              icon={<Building size={20} />}
              label="Postes Internes"
              active={activeTab === 'our-positions'}
            />
            <TabButton
              id="partner-positions"
              icon={<Users size={20} />}
              label="Offres Partenaires"
              active={activeTab === 'partner-positions'}
            />
            <TabButton
              id="spontaneous"
              icon={<Send size={20} />}
              label="Candidature Spontanée"
              active={activeTab === 'spontaneous'}
            />
          </div>

          {activeTab !== 'spontaneous' && <TypeToggle />}

          <div className="max-w-4xl mx-auto">
            {activeTab === 'spontaneous' ? (
              <div className="bg-white rounded-lg p-8 shadow-lg animate-slideUp">
                <p className="text-gray-800 text-lg mb-8 leading-relaxed text-center">
                  Votre talent nous intéresse ! Même si nous n'avons pas de poste correspondant à votre profil actuellement,
                  nous sommes toujours à l'affût des meilleurs talents. Envoyez-nous votre candidature et nous vous
                  recontacterons pour les opportunités à venir.
                </p>

                <form className="space-y-6" onSubmit={handleSpontaneousApplication}>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: mainColor }}>
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: mainColor }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: mainColor }}>
                      CV (PDF)
                    </label>
                    <input
                      type="file"
                      name="resume"
                      className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                      accept=".pdf"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: mainColor }}>
                      Lettre de Motivation (PDF)
                    </label>
                    <input
                      type="file"
                      name="coverLetter"
                      className="w-full p-3 border-b border-gray-300 focus:border-[#168187] focus:outline-none transition-colors"
                      accept=".pdf"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all hover-scale shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: mainColor }}
                  >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer la Candidature'}
                  </button>
                </form>
              </div>
            ) : selectedJob ? (
              <JobDetails job={selectedJob} />
            ) : (
              <div className="grid gap-6">
                {filteredJobs.map((position, index) => (
                  <div 
                    key={position.id} 
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-all hover-scale duration-200 animate-slideIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            <img
                              src={`http://localhost:8081/api/uploads/jobs/${position.imagePath}`}
                              alt={position.title}
                              className="w-16 h-16 rounded-full object-cover border-2 border-[#168187] mr-2 hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          {position.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                          {position.partnerName && (
                            <>
                              <span>{position.partnerName}</span>
                              <span>•</span>
                            </>
                          )}
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} />
                            <span>{position.location}</span>
                          </div>
                          <span>•</span>
                          <span>{position.jobType === "JOB" ? "Temps plein" : "Stage"}</span>
                          <span>•</span>
                          <span>{position.jobCategory}</span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{position.description}</p>
                      </div>

                      <button
                        onClick={() => setSelectedJob(position)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-all hover-scale shadow-md"
                        style={{ backgroundColor: mainColor }}
                      >
                        <span>Voir les Détails</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersInterface;













