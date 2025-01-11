import React, { useState } from "react";
import { features } from "../../constants";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import ExpertsMain from "../components/ExpertCard";
import PartnersMain from "../components/PartnerCard";
import Button from "../layouts/Button";
import { FilteredExpertList } from "../components/FilteredExpertList";

const FeatureCard = ({ icon, title, content, index, path }) => (
  <a href={path} className="no-underline">
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
      <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
        <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-[18px] leading-[23.4px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
  </a>
);


const Business = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState(null);

  const toggleModal = (content = null) => {
    setCurrentModalContent(content);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <section id="apropos" className={`${layout.section} flex flex-col items-center`}>
      <div className="flex flex-1 flex-col justify-evenly text-center">
        {/* Titre aligné en haut */}
        <h2 className={`${styles.heading2} mb-5`}>
          Votre Partenaire <br className="sm:block hidden" /> pour une Transformation Durable et Innovante
        </h2>

        {/* Paragraphe centré */}
        <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
          Chez EHC Group, nous accompagnons les entreprises, les institutions et les individus dans leur évolution grâce à des solutions innovantes en coaching, recrutement, et formation. Forts de plus de 15 ans d’expertise, nous sommes engagés à fournir des services de qualité adaptés à vos besoins spécifiques.
        </p>

        {/* Bouton centré */}
        <div className="btn-center flex flex-row justify-center gap-2">
          <Button onClick={() => toggleModal(<ExpertsMain />)} children={"Pourquoi nous choisir ?"} />
          <Button onClick={() => toggleModal(<PartnersMain />)} children={"Partenaires à Vos Côtés"} />
          <Button onClick={() => toggleModal(<FilteredExpertList />)} children={"Experts à Votre Service"} />

          {/* Modal Component */}
          <Modal isVisible={isModalVisible} onClose={() => toggleModal()} title="">
            {currentModalContent}
          </Modal>
        </div>
      </div>

      {/* Si vous avez des fonctionnalités supplémentaires */}
      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
