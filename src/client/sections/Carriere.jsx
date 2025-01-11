import React, { useState } from "react";
import { carriere } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import CareerInterface from "../components/CareerInterface_old";
import Button from "../layouts/Button";
import { useNavigate } from 'react-router-dom';

const Carriere = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
const navigate = useNavigate();
  const toggleModal = () => setIsModalVisible(!isModalVisible);



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

        <div className="flex justify-center mt-8">
          <Button onClick={() => {
    navigate("/careerInterface");
  }} children={"Découvrir Nos Opportunités"} />
          {/* <button
            onClick={toggleModal}
            className="px-12 py-4 bg-[#168187] text-white rounded-lg hover:opacity-90 transition-all duration-300 text-lg font-semibold"
          >
            
          </button> */}
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title="Nos offres"
      >
        <CareerInterface />
      </Modal>
    </section>
  );
};

export default Carriere;




