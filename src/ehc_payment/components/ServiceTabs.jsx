import React from 'react';

const categories = {
  CONSULTING: { name: 'EHC Consulting', imgage:'D111.png'},
  LEARNING: { name: 'EHC Learning', icon: '' },
  RECRUITMENT: { name: 'EHC Recruiting', icon: '' },
  SERVICE_AND_EVENT: { name: 'EHC Services & Events', icon: '' },
  ENGINEERING: { name: 'EHC Engineering', icon: '' }
};

export default function PServiceTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {Object.entries(categories).map(([key, { name, icon }]) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`group flex flex-col items-center p-4 rounded-xl transition-all transform hover:scale-105 ${
            activeTab === key
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-primary/5'
          }`}
        >
          <span className="text-2xl mb-2">{icon}</span>
          <span className="font-medium text-sm">{name}</span>
          <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 ${
            activeTab === key ? 'w-full bg-white' : 'bg-primary'
          }`} />
        </button>
      ))}
    </div>
  );
}