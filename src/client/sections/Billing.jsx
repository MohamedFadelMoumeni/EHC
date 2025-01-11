import {bill} from "../../assets";
import styles, { layout } from "../../style";
import React, { useState } from "react";
import Modal from "../layouts/Modal"
import ServiceRequestForm from "../components/ServiceRequestForm"
import Button from "../layouts/Button"


const Billing = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
  <>
  <section id="services" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Des Services Mesure  <br className="sm:block hidden" /> Pour Répondre à Vos Besoins
      </h2>
      <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5`} >
      Chez EHC Groupe, nous accompagnons aussi bien les particuliers que les entreprises dans leurs parcours de développement.
      Grâce à nos services de coaching personnalisé, formations spécialisées et accompagnement stratégique, nous vous aidons à atteindre vos objectifs professionnels et organisationnels.
      </p>


      
    </div>
  </section>
  <section className="flex-1 flex flex-col  ">
  <div className="flex-1 flex flex-col  ">
      <h2 className={styles.heading2}>Passez à l'action : essayez notre service !</h2>
      <p className={`${styles.paragraph} mt-5`}>
        Que vous soyez un particulier, une équipe -centerou une organisation, nos services sont conçus pour vous accompagner dans votre transformation.
        Coaching, formation et recrutement : tout ce dont vous avez besoin pour atteindre vos objectifs et révéler votre potentiel.
      </p>
    </div>

        <div className={` sm:ml-34  mt-4`}>
                  <Button onClick={toggleModal} children={"Découvrez Nos Solutions"} className={"flex-start"}/>

                  {/* Modal Component */}
                <Modal isVisible={isModalVisible} onClose={toggleModal} title="Formulaire a remplir">
                    <ServiceRequestForm/>
                </Modal>
        </div>
    </section>
  </>
  )
};

export default Billing;
