import styles from "../../style";

const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Passez à l'action : essayez notre service !</h2>
      <p className={`${styles.paragraph} mt-5`}>
        Que vous soyez un particulier, une équipe ou une organisation, nos services sont conçus pour vous accompagner dans votre transformation.
        Coaching, formation et recrutement : tout ce dont vous avez besoin pour atteindre vos objectifs et révéler votre potentiel.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue rounded-[10px] outline-none`}>
        Contactez-Nous
      </button>
    </div>
  </section>
);

export default CTA;
