import React, { useState } from "react";
import { carriere } from "../../assets";
import styles, { layout } from "../../style";
import Modal from "../layouts/Modal"
import PaymentModal from "../components/PaymentModal";
import Button from "../layouts/Button";
import { useNavigate } from "react-router-dom";


const Payment = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <section id="paiment" className={layout.sectionReverse}>
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
          Paiement sécurisé avec EHC Group
        </h2>
        <p className={`${styles.paragraph} max-w-[800px] mt-5 mx-auto mb-5 text-justify leading-relaxed`}>
        Simplifiez vos transactions grâce à une plateforme sécurisée qui allie rapidité, transparence et protection optimale de vos données. Chez EHC Group, nous faisons de votre tranquillité une priorité, en vous garantissant des paiements sûrs et sans tracas. 
        Faites confiance à notre expertise pour une expérience fluide et fiable.
        </p>

        <div className="flex flex-col gap-6">
          <Button onClick={()=>{
            navigate("/payment")
          }} children={"Achat et Services"} />
        </div>

      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title=""
      >
        <PaymentModal />
      </Modal>

    </section>
  );
};

export default Payment;