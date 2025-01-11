import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Building, Users, Send, ChevronRight } from 'lucide-react';

const CareersInterface = () => {
  const [activeTab, setActiveTab] = useState('our-positions');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [positionType, setPositionType] = useState('JOB');
  const [jobs, setJobs] = useState([]);
  const mainColor = '#168187';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const TabButton = ({ id, icon, label, active }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSelectedJob(null);
        setShowApplicationForm(false);
      }}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
        active ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
      style={active ? { backgroundColor: mainColor } : {}}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const TypeToggle = () => (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => {
          setPositionType('JOB');
          setSelectedJob(null);
        }}
        className="px-6 py-2 rounded-lg text-white transition-opacity"
        style={{ 
          backgroundColor: mainColor,
          opacity: positionType === 'JOB' ? 0.5 : 1, 
          color: positionType === 'JOB' ? "black" : ""
        }}
      >
        Temps Plein
      </button>
      <button
        onClick={() => {
          setPositionType('INTERNSHIP');
          setSelectedJob(null);
        }}
        className="px-6 py-2 rounded-lg text-white transition-opacity"
        style={{ 
          backgroundColor: mainColor,
          opacity: positionType === 'INTERNSHIP' ? 0.5 : 1,
          color: positionType === 'INTERNSHIP' ? "black" : ""
        }}
      >
        Stage
      </button>
    </div>
  );

  const filteredPositions = jobs.filter(position => {
    if (activeTab === 'our-positions') {
      return position.jobSource === 'OUR_JOB' && position.jobType === positionType;
    }
    if (activeTab === 'partner-positions') {
      return position.jobSource === 'PARTNER_JOB' && position.jobType === positionType;
    }
    return false;
  });

  const JobDetails = ({ job }) => (
    <div className="border rounded-lg p-6">
      <div className="mb-6">
        <button 
          onClick={() => {
            setSelectedJob(null);
            setShowApplicationForm(false);
          }}
          className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
        >
          <ArrowRight className="rotate-180" size={16} />
          <span>Retour aux offres</span>
        </button>
      </div>

      {!showApplicationForm ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <span>•</span>
              <span>{job.jobType == "JOB" ? "Temps plein" : "Stage" }</span>
              {job.partnerName && (
                <>
                  <span>•</span>
                  <span>{job.partnerName}</span>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Description du Poste</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Prérequis</h3>
            <p className="text-gray-600">{job.requirements}</p>
          </div>

          <div>
            <p className="text-gray-600 italic">Ref : {job.reference}</p>
          </div>

          <button
            onClick={() => setShowApplicationForm(true)}
            className="w-full py-3 text-white rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: mainColor }}
          >
            <span>Postuler Maintenant</span>
            <ChevronRight size={20} />
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-6" style={{ color: mainColor }}>Formulaire de Candidature</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>Nom Complet</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>Téléphone</label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>Lettre de Motivation (PDF)</label>
              <input
                type="file"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                accept=".pdf"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: mainColor }}>CV (PDF)</label>
              <input
                type="file"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                accept=".pdf"
                required
              />
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <button
                type="submit"
                className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: mainColor }}
              >
                Envoyer la Candidature
              </button>
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                className="w-full py-3 rounded-lg transition-colors text-white hover:opacity-90"
                style={{ backgroundColor: mainColor }}
              >
                Retour aux Détails du Poste
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Donnez Vie à Vos Ambitions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Vous êtes talentueux et ambitieux ? Rejoignez une équipe où chaque expertise compte.
          Chez nous, vos idées façonnent l'avenir et votre potentiel n'a pas de limites.
          Ensemble, créons des solutions qui transforment le monde.
        </p>
      </div>

      <div className="flex space-x-4 mb-8 border-b pb-4">
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

      {activeTab === 'spontaneous' ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <p className="text-gray-800 text-lg mb-8 leading-relaxed text-center">
              Votre talent nous intéresse ! Même si nous n'avons pas de poste correspondant à votre profil actuellement,
              nous sommes toujours à l'affût des meilleurs talents. Envoyez-nous votre candidature et nous vous
              recontacterons pour les opportunités à venir.
            </p>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: mainColor }}>Nom Complet</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ borderColor: '#E5E7EB' }}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: mainColor }}>Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ borderColor: '#E5E7EB' }}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: mainColor }}>CV (PDF)</label>
                <input
                  type="file"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ borderColor: '#E5E7EB' }}
                  accept=".pdf"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: mainColor }}>Lettre de Motivation (PDF)</label>
                <input
                  type="file"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ borderColor: '#E5E7EB' }}
                  accept=".pdf"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: mainColor }}
              >
                Envoyer la Candidature
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <TypeToggle />
          {selectedJob ? (
            <JobDetails job={selectedJob} />
          ) : (
            <div className="space-y-4">
              {filteredPositions.map((position) => (
                <div key={position.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{position.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-600">
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
                        <span>{position.jobType == "JOB" ? "Temps plein" : "Stage"}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedJob(position)}
                      className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
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
        </>
      )}
    </div>
  );
};

export default CareersInterface;