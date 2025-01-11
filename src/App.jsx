import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import Client from './client/Client';
import Admin from './admin/admin';
import Login from './admin/pages/Login';
import MainLayout from './admin/layouts/MainLayout';
 

import About from './admin/pages/about';
import ExpertAdd from './admin/components/about/ExpertAdd';
import ExpertEdit from './admin/components/about/ExpertEdit';
import ExpertShow from './admin/components/about/ExpertShow';
import PartnerAdd from './admin/components/about/PartnerAdd';
import PartnerEdit from './admin/components/about/PartnerEdit';
import PartnerShow from './admin/components/about/PartnerShow';
import TestimonialAdd from './admin/components/about/TestimonialAdd';
import TestimonialEdit from './admin/components/about/TestimonialEdit';
import TestimonialShow from './admin/components/about/TestimonialShow';

import Media from './admin/pages/media';
import ArticleAdd from './admin/components/media/ArticleAdd';
import ArticleEdit from './admin/components/media/ArticleEdit';
import ArticleShow from './admin/components/media/ArticleShow';
import VideoAdd from './admin/components/media/VideoAdd';
import VideoEdit from './admin/components/media/VideoEdit';
import VideoShow from './admin/components/media/VideoShow';
import PodcastAdd from './admin/components/media/PodcastAdd';
import PodcastEdit from './admin/components/media/PodcastEdit';
import PodcastShow from './admin/components/media/PodcastShow';

import Career from './admin/pages/carriere';
import JobAdd from './admin/components/carriere/JobAdd';
import JobEdit from './admin/components/carriere/JobEdit';
import JobShow from './admin/components/carriere/JobShow';
 // import Application from './admin/pages/carriere/Application';

import ApplicationShow from './admin/components/carriere/ApplicationShow';

import News from './admin/pages/actualite';
import NewsAdd from './admin/components/news/NewsAdd';
import NewsEdit from './admin/components/news/NewsEdit';
import NewsShow from './admin/components/news/NewsShow';

import Services from './admin/pages/services';
import ServiceAdd from './admin/components/service/ServiceAdd';
import ServiceEdit from './admin/components/service/ServiceEdit';
import ServiceShow from './admin/components/service/ServiceShow';

import Contact from './admin/pages/contact';
import ContactAdd from './admin/components/contact/ContactAdd';
import ContactEdit from './admin/components/contact/ContactEdit';
import ContactShow from './admin/components/contact/ContactShow';


import CsHeader from './ehc_consulting/components/Header';
import CsAboutUs from './ehc_consulting/components/AboutUs';
import CsServices from './ehc_consulting/components/Services';
import CsWhyUs from './ehc_consulting/components/WhyUs';
import CsMethodology from './ehc_consulting/components/Methodology';
import CsContact from './ehc_consulting/components/Contact';
import CsFooter from './ehc_consulting/components/Footer';

import LrHeader from './ehc_learning/components/Header';
import LrAbout from './ehc_learning/components/About';
import LrServices from './ehc_learning/components/Services';
import LrWhyChooseUs from './ehc_learning/components/WhyChooseUs';
import LrMethodology from './ehc_learning/components/Methodology';
import LrContact from './ehc_learning/components/Contact';
import LrFooter from './ehc_learning/components/Footer';

import RcHeader from './ehc_recruitment/components/Header';
import RcAboutMission from './ehc_recruitment/components/AboutMission';
import RcServices from './ehc_recruitment/components/Services';
import RcWhyChooseUs from './ehc_recruitment/components/WhyChooseUs';
import RcContact from './ehc_recruitment/components/Contact';
import RcFooter from './ehc_recruitment/components/Footer';

import CareersInterface from './client/components/CareersInterface';

import EvHero from './ehc_events/components/Hero';
import EvMission from './ehc_events/components/Mission';
import EvServices from './ehc_events/components/Services';
import EvWhyChooseUs from './ehc_events/components/WhyChooseUs';
import EvCallToAction from './ehc_events/components/CallToAction';
import EvFooter from './ehc_events/components/Footer';

import EgHero from './ehc_engineering/components/Hero';
import EgMission from './ehc_engineering/components/Mission';
import EgServices from './ehc_engineering/components/Services';
import EgWhyUs from './ehc_engineering/components/WhyUs';
import EgContactForm from './ehc_engineering/components/Contact/ContactForm';
import Payment from './admin/pages/payment';
import PServiceAdd from './admin/components/payment/ServiceAdd';
import PServiceShow from './admin/components/payment/ServiceShow';
import PServiceEdit from './admin/components/payment/ServiceEdit';
import PromotionAdd from './admin/components/payment/PromotionAdd';
import PromotionEdit from './admin/components/payment/PromotionEdit';
import PromotionShow from './admin/components/payment/PromotionShow';
import PaymentPage from './ehc_payment/PaymentPage';
import MediaPage from './ehc_media/MediaPage';
import MessageDirecteur from './client/pages/MessageDirecteur/MessageDirecteur';
import Structure from './client/pages/Structure';




const App = () => (
  <div className='font-custom'>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Client />} />


        <Route path="/careerInterface" element={<CareersInterface />} />

        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/about" element={<About />} />
          <Route path="/admin/about/expertadd" element={<ExpertAdd />} />
          <Route path="/admin/about/expertedit/:id" element={<ExpertEdit />} />
          <Route path="/admin/about/expertshow/:id" element={<ExpertShow />} />
          <Route path="/admin/about/partneradd" element={<PartnerAdd />} />
          <Route path="/admin/about/partneredit/:id" element={<PartnerEdit />} />
          <Route path="/admin/about/partnershow/:id" element={<PartnerShow />} />
          <Route path="/admin/about/testimonialadd" element={<TestimonialAdd />} />
          <Route path="/admin/about/testimonialedit/:id" element={<TestimonialEdit />} />
          <Route path="/admin/about/testimonialshow/:id" element={<TestimonialShow />} />

          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/media/articlesadd" element={<ArticleAdd />} />
          <Route path="/admin/media/articlesedit/:id" element={<ArticleEdit />} />
          <Route path="/admin/media/articlesshow/:id" element={<ArticleShow />} />
          <Route path="/admin/media/videosadd" element={<VideoAdd />} />
          <Route path="/admin/media/videosedit/:id" element={<VideoEdit />} />
          <Route path="/admin/media/videosshow/:id" element={<VideoShow />} />
          <Route path="/admin/media/podcastsadd" element={<PodcastAdd />} />
          <Route path="/admin/media/podcastsedit/:id" element={<PodcastEdit />} />
          <Route path="/admin/media/podcastsshow/:id" element={<PodcastShow />} />

          <Route path="/admin/career" element={<Career />} />
          <Route path="/admin/career/jobsadd" element={<JobAdd />} />
          <Route path="/admin/career/jobsedit/:id" element={<JobEdit />} />
          <Route path="/admin/career/jobsshow/:id" element={<JobShow />} />

          <Route path="/admin/career/applicationsshow/:id" element={<ApplicationShow />} />

          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/newsadd" element={<NewsAdd />} />
          <Route path="/admin/newsedit/:id" element={<NewsEdit />} />
          <Route path="/admin/newsshow/:id" element={<NewsShow />} />

          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/servicesadd" element={<ServiceAdd />} />
          <Route path="/admin/servicesedit/:id" element={<ServiceEdit />} />
          <Route path="/admin/servicesshow/:id" element={<ServiceShow />} />

          <Route path='/admin/contacts' element={<Contact />} />
          <Route path="/admin/contactsadd" element={<ContactAdd />} />
          <Route path="/admin/contactsedit/:id" element={<ContactEdit />} />
          <Route path="/admin/contactsshow/:id" element={<ContactShow />} />


          <Route path='/admin/payment' element={<Payment />} />
          <Route path="/admin/payment/servicesadd" element={<PServiceAdd />} />
          <Route path="/admin/payment/servicesedit/:id" element={<PServiceEdit />} />
          <Route path="/admin/payment/servicesshow/:id" element={<PServiceShow />} />
          <Route path="/admin/payment/promosadd" element={<PromotionAdd />} />
          <Route path="/admin/payment/promosedit/:id" element={<PromotionEdit />} />
          <Route path="/admin/payment/promosshow/:id" element={<PromotionShow />} />


          
        </Route>

        <Route path="/ehc_consulting" element={
          <div className="min-h-screen ehc ehc_consulting">
            <CsHeader />
            <CsAboutUs />
            <CsServices />
            <CsWhyUs />
            <CsMethodology />
            <CsContact />
            <CsFooter />
          </div>
        } />

        <Route path="/ehc_learning" element={
          <div className="min-h-screen ehc ehc_learning">
            <LrHeader />
            <LrAbout />
            <LrServices />
            <LrWhyChooseUs />
            <LrMethodology />
            <LrContact />
            <LrFooter />
          </div>
        }
        />
        <Route path="/ehc_recruitment" element={

          <div className="min-h-screen ehc ehc_recruitment">
            <RcHeader />
            <RcAboutMission />
            <RcServices />
            <RcWhyChooseUs />
            <RcContact />
            <RcFooter />
          </div>
        }
        />

        <Route path="/ehc_events" element={
          <div className="font-sans ehc ehc_events">
            <EvHero />
            <EvMission />
            <EvServices />
            <EvWhyChooseUs />
            <EvCallToAction />
            <EvFooter />
          </div>
        } />

        <Route path="/ehc_engineering" element={
          <div className="min-h-screen ehc ehc_engineering">
            <EgHero />
            <EgMission />
            <EgServices />
            <EgWhyUs />
            <EgContactForm />
          </div>
        } />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/media" element={<MediaPage/>} />

        <Route path="/message-directeur" element={<MessageDirecteur/>}/>
        <Route path="/structure" element={<Structure/>}/>
        

      <Route path="/*" element={<h1 >404 NOT FOUND</h1>} />
      </Routes>


      
    </Router>
    <ToastContainer />
  </div>
);

export default App;
