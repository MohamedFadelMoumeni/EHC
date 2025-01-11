import React, { useState } from "react";
import { card } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import MediaInterface from "../components/MediaInterface";
import Button from "../layouts/Button";
import { useNavigate } from "react-router-dom";


const CardDeal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const navigate = useNavigate();
  return (
  <section className={layout.section } id="medias">
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Ressources Essentielles  <br className="sm:block hidden" /> pour Votre Croissance
      </h2>
      <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
          Accédez à une sélection de ressources conçues pour accompagner votre développement 
          personnel et professionnel. Vidéos, articles, podcasts et outils pratiques vous attendent pour 
          vous inspirer, renforcer vos compétences, et transformer votre organisation. Explorez des 
          contenus exclusifs et découvrez des solutions adaptées à vos ambitions.
      </p>

        {/* <button
          onClick={toggleModal}
          className="px-4 py-2 rounded-md font-semibold"
          style={{ backgroundColor: "#168187" , color : "white" }}
          >
          Accéder aux Ressources
        </button> */}

      <Button onClick={()=>{
        navigate("/media");
      }} children={"Accéder Aux Ressources"}/>

        {/* Modal Component */}
      <Modal isVisible={isModalVisible} onClose={toggleModal} title="">
      <MediaInterface/>
      </Modal>

    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
  )
};

export default CardDeal;
