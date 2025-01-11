import { motion } from 'framer-motion';

const ProgressBar = () => (
  <motion.div
    className="w-full h-1 bg-primary/20 mt-6 rounded-full overflow-hidden"
    whileInView="visible"
    initial="hidden"
    viewport={{ once: true }}
    variants={{
      visible: { 
        transition: {
          staggerChildren: 0.2
        }
      },
      hidden: {}
    }}
  >
    <motion.div
      className="h-full bg-primary"
      variants={{
        visible: { width: "100%", transition: { duration: 1 } },
        hidden: { width: "0%" }
      }}
    />
  </motion.div>
);

export default function LrAbout() {
  return (
    <section id="apropos_learning" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">À propos de EHC Learning</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Notre Histoire</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
            EHC Learning se positionne comme un acteur clé dans le développement des talents 
            et des compétences, en proposant des solutions de formation standard et sur-mesure, 
            parfaitement adaptées aux besoins des organisations.
          </p>

            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Grâce à une expertise approfondie en ingénierie pédagogique, nous vous accompagnons 
              tout au long de vos projets de formation pour garantir un impact durable et mesurable.
            </p>
            <ProgressBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Notre Mission</h3>
            <p className="text-lg text-gray-700 mb-6 text-justify">
              Chez EHC Learning, notre mission est de transformer la formation en un levier 
              stratégique de performance pour les entreprises. Nous concevons des parcours 
              pédagogiques innovants et engageants, répondant aux enjeux spécifiques de nos clients.
            </p>
            <p className="text-lg text-gray-700 text-justify ">
              Notre objectif est d'aider les organisations à renforcer les compétences de leurs 
              collaborateurs, tout en alignant leurs initiatives de formation sur leurs objectifs 
              opérationnels et stratégiques.
            </p>
            <ProgressBar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}