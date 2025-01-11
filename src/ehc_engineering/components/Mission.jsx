export default function EgMission() {
  return (
    <section id="mission" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-primary mb-6">Notre Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Transformer vos défis technologiques en opportunités stratégiques, 
              grâce à des solutions innovantes et personnalisées.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Innovation continue
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Excellence technique
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Satisfaction client
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                alt="Digital Transformation" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}