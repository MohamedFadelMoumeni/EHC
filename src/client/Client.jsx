import styles from "../style";
import Carriere from "./sections/Carriere";
import ContactCompany from "./sections/ContactCompany";
import Payment from "./sections/Payment";
import Stats from "./sections/Stats";
import Business from "./sections/Business";
import Billing from "./sections/Billing";
import CardDeal from "./sections/CardDeal";
import Testimonials from "./sections/Testimonials";

import Hero from "./layouts/Hero";
import Navbar from "./layouts/Navbar";
import Chatbot from "./layouts/chat";
import Footer from "./layouts/Footer";
import News from "./sections/News";

import InfiniteLogoSlider from "./layouts/InfiniteLogoSlider";



const Client = () => (
  <div className="client bg-white w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-white ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
         
        <Hero />
      </div>

    </div>
    
    <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <News />
        <Business />
        <Billing />
        <CardDeal />
        <Carriere/>
        <ContactCompany />
        <Payment />
        <InfiniteLogoSlider />
        <Testimonials />
        <Footer />
        <Chatbot/>
      </div>
    </div>
  </div>
);

export default Client;
