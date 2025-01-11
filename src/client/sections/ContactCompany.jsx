import React, { useState } from "react";
import { contact } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal";
import EnvoyerMessage from "../components/EnvoyerMessage";
import DemandeDevis from "../components/DemandeDevis";
import Localisation from "../components/Localisation";
import Button from "../layouts/Button";

const ContactCompany = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section className={layout.section} id="contact">
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Contactez EHC Group</h2>
        <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
          Vous avez des questions ? Envie de collaborer ou besoin d’un devis rapide? 
          Notre équipe est là pour répondre à vos attentes. Contactez-nous dès aujourd’hui pour 
          bénéficier d’un accompagnement sur-mesure. Retrouvez également nos coordonnées et notre emplacement pour nous rendre visite.
        </p>
        <div className="btn-center flex flex-row md:flex-nowrap justify-space gap-4">
          <Button onClick={() => openModal("EnvoyerMessage")} children={"Envoyer un message"}/>
          <Button onClick={() => openModal("DemandeDevis")} children={"Demander un devis"}/>
          <Button onClick={() => openModal("Localisation")} children={"Voir la localisation"}/>
        </div>

        {/* Modal Component */}
        <Modal isVisible={activeModal !== null} onClose={closeModal}>
          {activeModal === "EnvoyerMessage" && <EnvoyerMessage />}
          {activeModal === "DemandeDevis" && <DemandeDevis />}
          {activeModal === "Localisation" && <Localisation />}
        </Modal>
      </div>

      <div className={layout.sectionImg}>
        <img src={contact} alt="billing" className="w-[100%] h-[100%]" />
      </div>
    </section>
  );
};

export default ContactCompany;
