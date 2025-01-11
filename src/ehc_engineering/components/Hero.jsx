export default function EgHero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
          backgroundPosition: "center 20%"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Bienvenue chez EHC Engineering
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Votre partenaire en solutions informatiques et gestion de projets intégrée
          </p>
          <button
            onClick={() => scrollToSection('services')}
            className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-full transition duration-300 cursor-pointer"
          >
            Explorez nos services
          </button>
        </div>
      </div>
    </div>
  );
}
