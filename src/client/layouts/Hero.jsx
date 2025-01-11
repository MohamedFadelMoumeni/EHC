import styles from "../../style";
import {  zomiq } from "../../assets";
import GetStarted from "../components/GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
      <div className="flex flex-col items-start w-full" style={{ marginTop: '-60px' }}>
      
        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100px] leading-[75px] whitespace-nowrap">
             Accompagnez Votre
        </h1>
        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100px] leading-[75px]">
            {"Transformation".split("").map((char, index) => (
              <span
                key={index}
                className={`color-blue inline-block opacity-0 animate-fadeInWithPause`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {char}
              </span>
            ))}
          </h1>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] ss:leading-[100px] leading-[75px]">
         avec EHC Groupe.
        </h1>
      </div>


      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-justify leading-relaxed`}>
  Nous vous aidons à maximiser votre potentiel humain et organisationnel grâce à nos services de coaching, formation et recrutement.
     </p>

      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={zomiq} alt="billing" className=" zomiq w-[100%] h-[100%] relative z-[5]" /> 

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
