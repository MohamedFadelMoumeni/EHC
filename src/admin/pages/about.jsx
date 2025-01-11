// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DataTable from '../components/DataTable';
// import { useNavigate } from 'react-router-dom';
// import ConfirmationModal from '../layouts/ConfirmationModal';

// const ExpertManagement = () => {
//    const navigate = useNavigate();
//    const [experts, setExperts] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [isModalOpen, setModalOpen] = useState(false);
//    const [selectedExpert, setSelectedExpert] = useState(null);

//    useEffect(() => {
//        fetchExperts();
//    }, []);

//    const fetchExperts = async () => {
//        try {
//            const response = await axios.get('http://localhost:8081/api/experts');
//            setExperts(response.data);
//            setError(null);
//        } catch (err) {
//            setError('Failed to fetch experts');
//            console.error('Error fetching experts:', err);
//        } finally {
//            setLoading(false);
//        }
//    };

//    const columns = [
//        { key: 'id', label: 'ID' },
//        { key: 'fullName', label: 'Full name' },
//        { key: 'function', label: 'Function' },
//        { key: 'seniority', label: 'Seniority' },
//        { key: 'expertCategory', label: 'Category' },
//    ];

//    const handleDelete = async (expert) => {
//        setSelectedExpert(expert);
//        setModalOpen(true);
//    };

//    const confirmDelete = async () => {
//        if (selectedExpert) {
//            try {
//                await axios.delete(`http://localhost:8081/api/experts/${selectedExpert.id}`);
//                await fetchExperts();
//                setModalOpen(false);
//                setSelectedExpert(null);
//            } catch (err) {
//                setError('Failed to delete expert');
//                console.error('Error deleting expert:', err);
//            }
//        }
//    };

//    if (loading) return (
//        <div className="flex items-center justify-center p-6">
//            <div className="text-[#168187] font-medium flex items-center">
//                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                </svg>
//                Loading...
//            </div>
//        </div>
//    );
   
//    if (error) return <div className="text-red-500 p-6">{error}</div>;

//    return (
//        <>
//            <DataTable
//                title={"Gestion des Experts"}
//                onAdd={() => navigate('/admin/about/expertadd')}
//                data={experts}
//                columns={columns}
//                onEdit={(expert) => navigate(`/admin/about/expertedit/${expert.id}`)}
//                onDelete={handleDelete}
//                onView={(expert) => navigate(`/admin/about/expertshow/${expert.id}`)}
//                searchPlaceholder="Rechercher un expert..."
//            />
//            <ConfirmationModal
//                isOpen={isModalOpen}
//                onClose={() => setModalOpen(false)}
//                onConfirm={confirmDelete}
//                message={`Êtes-vous sûr de vouloir supprimer l'expert "${selectedExpert?.fullName}" ?`}
//            />
//        </>
//    );
// };

// const PartnerManagement = () => {
//    const navigate = useNavigate();
//    const [partners, setPartners] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [isModalOpen, setModalOpen] = useState(false);
//    const [selectedPartner, setSelectedPartner] = useState(null);

//    useEffect(() => {
//        fetchPartners();
//    }, []);

//    const fetchPartners = async () => {
//        try {
//            const response = await axios.get('http://localhost:8081/api/partners');
//            setPartners(response.data);
//            setError(null);
//        } catch (err) {
//            setError('Failed to fetch partners');
//            console.error('Error fetching partners:', err);
//        } finally {
//            setLoading(false);
//        }
//    };

//    const columns = [
//        { key: 'id', label: 'ID' },
//        { key: 'name', label: 'Nom' },
//     //    {
//     //        key: 'imagePath',
//     //        label: 'Logo',
//     //        render: (value) => (
//     //            <img
//     //                src={"http://localhost:8081/api/uploads/partners/"+value}
//     //                alt="Logo partenaire"
//     //                className="w-10 h-10 object-contain"
//     //                onError={(e) => {
//     //                    e.target.onerror = null;
//     //                    e.target.src = 'https://via.placeholder.com/40?text=Logo';
//     //                }}
//     //            />
//     //        )
//     //    },
//        { key: 'companyURL', label: 'URL' }
//    ];

//    const handleDelete = (partner) => {
//        setSelectedPartner(partner);
//        setModalOpen(true);
//    };

//    const confirmDelete = async () => {
//        if (selectedPartner) {
//            try {
//                await axios.delete(`http://localhost:8081/api/partners/${selectedPartner.id}`);
//                await fetchPartners();
//                setModalOpen(false);
//                setSelectedPartner(null);
//            } catch (err) {
//                setError('Failed to delete partner');
//                console.error('Error deleting partner:', err);
//            }
//        }
//    };


//    if (loading) return (
//        <div className="flex items-center justify-center p-6">
//            <div className="text-[#168187] font-medium flex items-center">
//                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                </svg>
//                Loading...
//            </div>
//        </div>
//    );
   
//    if (error) return <div className="text-red-500 p-6">{error}</div>;

//    return (
//        <>
//            <DataTable
//                title={"Gestion des Partenaires"}
//                onAdd={() => navigate('/admin/about/partneradd')}
//                data={partners}
//                columns={columns}
//                onEdit={(partner) => navigate(`/admin/about/partneredit/${partner.id}`)}
//                onDelete={handleDelete}
//                onView={(partner) => navigate(`/admin/about/partnershow/${partner.id}`)}
//                searchPlaceholder="Rechercher un partenaire..."
//            />
//            <ConfirmationModal
//                isOpen={isModalOpen}
//                onClose={() => setModalOpen(false)}
//                onConfirm={confirmDelete}
//                message={`Êtes-vous sûr de vouloir supprimer le partenaire "${selectedPartner?.name}" ?`}
//            />
//        </>
//    );
// };

// const TestimonialManagement = () => {
//    const navigate = useNavigate();
//    const [testimonials, setTestimonials] = useState([
//        {
//            id: 1,
//            author: 'Marie Dubois',
//            role: 'PDG',
//            content: 'Un service exceptionnel qui a vraiment aidé notre entreprise à se développer...'
//        },
//        {
//            id: 2,
//            author: 'Pierre Martin',
//            role: 'Directeur Technique',
//            content: "L'expertise technique et le support reçus étaient remarquables..."
//        },
//        {
//            id: 3,
//            author: 'Sophie Lambert',
//            role: 'Directrice Marketing',
//            content: 'Leur approche innovante a fait une réelle différence...'
//        }
//    ]);
//    const [isModalOpen, setModalOpen] = useState(false);
//    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

//    const columns = [
//        { key: 'id', label: 'ID' },
//        { key: 'author', label: 'Auteur' },
//        { key: 'role', label: 'Fonction' },
//        {
//            key: 'content',
//            label: 'Extrait',
//            render: (value) => value.substring(0, 50) + '...'
//        }
//    ];

//    const handleDelete = (testimonial) => {
//        setSelectedTestimonial(testimonial);
//        setModalOpen(true);
//    };

//    const confirmDelete = () => {
//        if (selectedTestimonial) {
//            setTestimonials((prev) => prev.filter((t) => t.id !== selectedTestimonial.id));
//            setSelectedTestimonial(null);
//            setModalOpen(false);
//        }
//    };

//    return (
//        <>
//            <DataTable
//                title={"Gestion des Témoignages"}
//                onAdd={() => navigate('/admin/about/testimonialadd')}
//                data={testimonials}
//                columns={columns}
//                onEdit={(testimonial) => navigate(`/admin/about/testimonialedit/${testimonial.id}`)}
//                onDelete={handleDelete}
//                onView={(testimonial) => navigate(`/admin/about/testimonialshow/${testimonial.id}`)}
//                searchPlaceholder="Rechercher un témoignage..."
//            />
//            <ConfirmationModal
//                isOpen={isModalOpen}
//                onClose={() => setModalOpen(false)}
//                onConfirm={confirmDelete}
//                message={`Êtes-vous sûr de vouloir supprimer le témoignage de "${selectedTestimonial?.author}" ?`}
//            />
//        </>
//    );
// };

// const TabNavigation = ({ activeTab, onTabChange }) => {
//    const tabs = [
//        { id: 'experts', label: 'Experts' },
//        { id: 'partners', label: 'Partenaires' },
//        { id: 'testimonials', label: 'Témoignages' }
//    ];

//    return (
//        <div className="border-b border-gray-200">
//            <nav className="-mb-px flex">
//                {tabs.map(tab => (
//                    <button
//                        key={tab.id}
//                        onClick={() => onTabChange(tab.id)}
//                        className={`
//                            py-4 px-8 text-center border-b-2 font-medium text-sm transition-all duration-200
//                            ${activeTab === tab.id
//                                ? 'border-[#168187] text-[#168187]'
//                                : 'border-transparent text-gray-500 hover:text-[#168187] hover:border-[#168187]/30'}
//                        `}
//                    >
//                        {tab.label}
//                    </button>
//                ))}
//            </nav>
//        </div>
//    );
// };

// const About = () => {
//    const [activeTab, setActiveTab] = useState('experts');

//    const renderContent = () => {
//        switch (activeTab) {
//            case 'experts':
//                return <ExpertManagement />;
//            case 'partners':
//                return <PartnerManagement />;
//            case 'testimonials':
//                return <TestimonialManagement />;
//            default:
//                return null;
//        }
//    };

//    return (
//        <div className="min-h-screen bg-gray-50/50">
//            <div className="max-w-7xl mx-auto py-6 px-2 sm:px-4 lg:px-6">
//                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//                    <TabNavigation
//                        activeTab={activeTab}
//                        onTabChange={setActiveTab}
//                    />
//                    <div className="p-6">
//                        {renderContent()}
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
// };

// export default About;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../layouts/ConfirmationModal';

const ExpertManagement = () => {
   const navigate = useNavigate();
   const [experts, setExperts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isModalOpen, setModalOpen] = useState(false);
   const [selectedExpert, setSelectedExpert] = useState(null);

   useEffect(() => {
       fetchExperts();
   }, []);

   const fetchExperts = async () => {
       try {
           const response = await axios.get('http://localhost:8081/api/experts');
           setExperts(response.data);
           setError(null);
       } catch (err) {
           setError('Failed to fetch experts');
           console.error('Error fetching experts:', err);
       } finally {
           setLoading(false);
       }
   };

   const columns = [
       { key: 'id', label: 'ID' },
       { key: 'fullName', label: 'Full name' },
       { key: 'function', label: 'Function' },
       { key: 'seniority', label: 'Seniority' },
       { key: 'expertCategory', label: 'Category' },
   ];

   const handleDelete = async (expert) => {
       setSelectedExpert(expert);
       setModalOpen(true);
   };

   const confirmDelete = async () => {
       if (selectedExpert) {
           try {
               await axios.delete(`http://localhost:8081/api/experts/${selectedExpert.id}`);
               await fetchExperts();
               setModalOpen(false);
               setSelectedExpert(null);
           } catch (err) {
               setError('Failed to delete expert');
               console.error('Error deleting expert:', err);
           }
       }
   };

   if (loading) return (
       <div className="flex items-center justify-center p-6">
           <div className="text-[#168187] font-medium flex items-center">
               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
               </svg>
               Loading...
           </div>
       </div>
   );
   
   if (error) return <div className="text-red-500 p-6">{error}</div>;

   return (
       <>
           <DataTable
               title={"Gestion des Experts"}
               onAdd={() => navigate('/admin/about/expertadd')}
               data={experts}
               columns={columns}
               onEdit={(expert) => navigate(`/admin/about/expertedit/${expert.id}`)}
               onDelete={handleDelete}
               onView={(expert) => navigate(`/admin/about/expertshow/${expert.id}`)}
               searchPlaceholder="Rechercher un expert..."
           />
           <ConfirmationModal
               isOpen={isModalOpen}
               onClose={() => setModalOpen(false)}
               onConfirm={confirmDelete}
               message={`Êtes-vous sûr de vouloir supprimer l'expert "${selectedExpert?.fullName}" ?`}
           />
       </>
   );
};

const PartnerManagement = () => {
   const navigate = useNavigate();
   const [partners, setPartners] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isModalOpen, setModalOpen] = useState(false);
   const [selectedPartner, setSelectedPartner] = useState(null);

   useEffect(() => {
       fetchPartners();
   }, []);

   const fetchPartners = async () => {
       try {
           const response = await axios.get('http://localhost:8081/api/partners');
           setPartners(response.data);
           setError(null);
       } catch (err) {
           setError('Failed to fetch partners');
           console.error('Error fetching partners:', err);
       } finally {
           setLoading(false);
       }
   };

   const columns = [
       { key: 'id', label: 'ID' },
       { key: 'name', label: 'Nom' },
       { key: 'companyURL', label: 'URL' }
   ];

   const handleDelete = (partner) => {
       setSelectedPartner(partner);
       setModalOpen(true);
   };

   const confirmDelete = async () => {
       if (selectedPartner) {
           try {
               await axios.delete(`http://localhost:8081/api/partners/${selectedPartner.id}`);
               await fetchPartners();
               setModalOpen(false);
               setSelectedPartner(null);
           } catch (err) {
               setError('Failed to delete partner');
               console.error('Error deleting partner:', err);
           }
       }
   };

   if (loading) return (
       <div className="flex items-center justify-center p-6">
           <div className="text-[#168187] font-medium flex items-center">
               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
               </svg>
               Loading...
           </div>
       </div>
   );
   
   if (error) return <div className="text-red-500 p-6">{error}</div>;

   return (
       <>
           <DataTable
               title={"Gestion des Partenaires"}
               onAdd={() => navigate('/admin/about/partneradd')}
               data={partners}
               columns={columns}
               onEdit={(partner) => navigate(`/admin/about/partneredit/${partner.id}`)}
               onDelete={handleDelete}
               onView={(partner) => navigate(`/admin/about/partnershow/${partner.id}`)}
               searchPlaceholder="Rechercher un partenaire..."
           />
           <ConfirmationModal
               isOpen={isModalOpen}
               onClose={() => setModalOpen(false)}
               onConfirm={confirmDelete}
               message={`Êtes-vous sûr de vouloir supprimer le partenaire "${selectedPartner?.name}" ?`}
           />
       </>
   );
};

const TestimonialManagement = () => {
    const navigate = useNavigate();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
 
    useEffect(() => {
        fetchTestimonials();
    }, []);
 
    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/testimonials');
            console.log('Testimonials response:', response.data); // Debug log
            setTestimonials(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch testimonials');
            console.error('Error fetching testimonials:', err);
        } finally {
            setLoading(false);
        }
    };
 
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'author', label: 'Author' },
        { 
            key: 'function', // Changed from 'role' to 'fonction'
            label: 'Role',
            render: (value) => value || 'N/A'
        },
        // {
        //     key: 'content',
        //     label: 'Excerpt',
        //     render: (value) => value ? value.substring(0, 50) + '...' : 'N/A'
        // }
    ];
 
    const handleDelete = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setModalOpen(true);
    };
 
    const confirmDelete = async () => {
        if (selectedTestimonial) {
            try {
                await axios.delete(`http://localhost:8081/api/testimonials/${selectedTestimonial.id}`);
                await fetchTestimonials();
                setModalOpen(false);
                setSelectedTestimonial(null);
            } catch (err) {
                setError('Failed to delete testimonial');
                console.error('Error deleting testimonial:', err);
            }
        }
    };
 
    if (loading) return (
        <div className="flex items-center justify-center p-6">
            <div className="text-[#168187] font-medium flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Loading...
            </div>
        </div>
    );
    
    if (error) return <div className="text-red-500 p-6">{error}</div>;
 
    return (
        <>
            <DataTable
                title={"Gestion des Témoignages"}
                onAdd={() => navigate('/admin/about/testimonialadd')}
                data={testimonials}
                columns={columns}
                onEdit={(testimonial) => navigate(`/admin/about/testimonialedit/${testimonial.id}`)}
                onDelete={handleDelete}
                onView={(testimonial) => navigate(`/admin/about/testimonialshow/${testimonial.id}`)}
                searchPlaceholder="Rechercher un témoignage..."
            />
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
                message={`Êtes-vous sûr de vouloir supprimer le témoignage de "${selectedTestimonial?.author}" ?`}
            />
        </>
    );
 };

const TabNavigation = ({ activeTab, onTabChange }) => {
   const tabs = [
       { id: 'experts', label: 'Experts' },
       { id: 'partners', label: 'Partenaires' },
       { id: 'testimonials', label: 'Témoignages' }
   ];

   return (
       <div className="border-b border-gray-200">
           <nav className="-mb-px flex">
               {tabs.map(tab => (
                   <button
                       key={tab.id}
                       onClick={() => onTabChange(tab.id)}
                       className={`
                           py-4 px-8 text-center border-b-2 font-medium text-sm transition-all duration-200
                           ${activeTab === tab.id
                               ? 'border-[#168187] text-[#168187]'
                               : 'border-transparent text-gray-500 hover:text-[#168187] hover:border-[#168187]/30'}
                       `}
                   >
                       {tab.label}
                   </button>
               ))}
           </nav>
       </div>
   );
};

const About = () => {
   const [activeTab, setActiveTab] = useState('experts');

   const renderContent = () => {
       switch (activeTab) {
           case 'experts':
               return <ExpertManagement />;
           case 'partners':
               return <PartnerManagement />;
           case 'testimonials':
               return <TestimonialManagement />;
           default:
               return null;
       }
   };

   return (
       <div className="min-h-screen bg-gray-50/50">
           <div className="max-w-7xl mx-auto py-6 px-2 sm:px-4 lg:px-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                   <TabNavigation
                       activeTab={activeTab}
                       onTabChange={setActiveTab}
                   />
                   <div className="p-6">
                       {renderContent()}
                   </div>
               </div>
           </div>
       </div>
   );
};

export default About;