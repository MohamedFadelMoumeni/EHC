import React, { useState } from "react";
import { news } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import NewsModal from "../components/NewsModal";
import Button from "../layouts/Button";


const News = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <section id="actualites" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <div className="relative bg-[#168187] rounded-xl">
          <div className="p-4 bg-white rounded-lg">
            <img 
              src={news} 
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
        Découvrez Nos Actualités et Événements
        </h2>
        <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
          Restez connectés avec les initiatives d'EHC Groupe ! Découvrez nos projets récents, nos collaborations stratégiques, et nos événements à venir. Que ce soit des annonces importantes, des webinaires inspirants ou des moments marquants, tout est ici pour vous tenir informé et engagé.
        </p>

        <div className="flex flex-col gap-6">
          <Button onClick={toggleModal} children={"Rejoindre l'Action "} />
          {/* <button 
            onClick={toggleModal}
            className="text-left text-lg hover:text-[#168187] transition-colors"
          >
            Actualités et événements ›
          </button> */}
        </div>
      </div>

      <Modal
        isVisible={isModalVisible} onClose={toggleModal} 
        title="Actualités et événements"
      >
        <NewsModal />
      </Modal>

    </section>
  );
};

export default News;