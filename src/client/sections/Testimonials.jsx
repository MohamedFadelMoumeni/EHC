import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../style";
import quotes from "../../assets/quotes.svg";

const FeedbackCard = ({ content, author: name, function: title, imagePath: img }) => (
  <motion.div 
    className="flex justify-between flex-col px-10 py-12 rounded-[20px] w-full md:w-[367px] feedback-card mx-4"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
    <p className="font-poppins font-normal break-words text-[18px] leading-[32.4px] my-10">
      {content}
    </p>
    
    <div className="flex flex-row">
      <img 
        src={`http://localhost:8081/api/uploads/testimonials/${img}`} 
        alt={name} 
        className="w-[48px] h-[48px] rounded-full" 
      />
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px]">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px]">
          {title}
        </p>
      </div>
    </div>
  </motion.div>
);

const NavigationDot = ({ active, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
      active ? 'bg-[#168187]' : 'bg-gray-400'
    }`}
    onClick={onClick}
  />
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  useEffect(() => {
    axios.get('http://localhost:8081/api/testimonials')
      .then(response => setTestimonials(response.data))
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      cards.push(testimonials[index]);
    }
    return cards;
  };

  return (
    <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2 className={styles.heading2}>
          Ce que disent <br className="sm:block hidden" /> nos clients
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            Découvrez comment nous avons transformé l'expérience de nos clients.
          </p>
        </div>
      </div>

      <div className="w-full relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <div className="flex justify-center flex-wrap md:flex-nowrap">
              {getVisibleCards().map((card, index) => (
                card && <FeedbackCard key={index} {...card} />
              ))}
            </div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center mt-8 gap-4">
          <button 
            onClick={handlePrev}
            className="bg-[#168187] p-2 rounded-full hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <NavigationDot
                key={index}
                active={currentIndex === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="bg-[#168187] p-2 rounded-full hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;