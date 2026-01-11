
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

interface ServiceSection {
  id: string;
  title: string;
  desc: string;
  isCore?: boolean;
  details: {
    whatIs: string;
    learnItems: string[];
    whyWorks: string[];
    bestFor: string[];
    learnHeading: string;
  };
}

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ServiceSection | null>(null);

  const services: ServiceSection[] = [
    { 
      id: 'portal',
      title: 'Digital Makerspace', 
      desc: 'The interactive hub for your classroom. Every partnership includes full school access to our units, tracking systems, and AI coach.',
      isCore: true,
      details: {
        whatIs: "The infrastructure of the ThynkLab Method. The Digital Makerspace is a platform-as-a-service that provides the roadmap, resources, and evidence-capture tools for every student.",
        learnHeading: "Core Features",
        learnItems: [
          "Curriculum-aligned Unit Pathways",
          "Interactive 'Make-Thynk-Tweak-Test' guides",
          "Digital 'Lab Reports' for evidence capture",
          "ThynkBot: AI Learning Scaffold for students"
        ],
        whyWorks: [
          "Removes teacher cognitive load",
          "Encourages student autonomy and agency",
          "Provides instant visibility of progress"
        ],
        bestFor: [
          "Whole-school implementation",
          "Digital leaders tracking outcomes",
          "Classrooms embracing student-led STEAM"
        ]
      }
    },
    { 
      id: 'online',
      title: 'Method Mastery Training', 
      desc: 'Digital learning modules delivered through the makerspace, focusing on implementation excellence and technical confidence.',
      details: {
        whatIs: "The foundation of ThynkLab’s professional learning. Self-paced training delivered through the Digital Makerspace, designed to fit real school timetables.",
        learnHeading: "What teachers master",
        learnItems: [
          "The ThynkLab Method® in depth",
          "Eliminating 'Blank Canvas' anxiety in STEAM",
          "How to run effective classroom design cycles",
          "Core technical skills in robotics and AI"
        ],
        whyWorks: [
          "Consistent, high-quality delivery",
          "Teachers learn by doing, not watching",
          "Resources are immediately classroom-ready"
        ],
        bestFor: [
          "Individual teachers",
          "Small teams",
          "Schools building capacity over time"
        ]
      }
    },
    { 
      id: 'workshops',
      title: 'Collaborative Workshops', 
      desc: 'Virtual and Hands-on workshops for whole-school teams who want to explore the Method together.',
      details: {
        whatIs: "Virtual or Hands-on workshops for whole-school teams who want to explore the ThynkLab Method® together and build shared understanding.",
        learnHeading: "Focus Areas",
        learnItems: [
          "Experiencing the method as learners",
          "Aligning practice across year groups",
          "Deep dives into specific tools or hardware",
          "Building confidence through collaborative making"
        ],
        whyWorks: [
          "Creates momentum and shared language",
          "Supports whole-school consistency",
          "Reinforces digital learning with hands-on practice"
        ],
        bestFor: [
          "Whole-school INSET days",
          "STEAM leads and subject teams",
          "Schools launching or refreshing provision"
        ]
      }
    },
    { 
      id: 'support',
      title: 'Ongoing Classroom Support', 
      desc: 'Expert guidance and exemplar materials to ensure every lesson is delivered with excellence.',
      details: {
        whatIs: "Ongoing support that bridges the gap between training and confident classroom delivery.",
        learnHeading: "What it includes",
        learnItems: [
          "Exemplar materials and models",
          "Guidance for adapting lessons to different learners",
          "Support with planning, pacing, and assessment",
          "Direct access to our education team for advice"
        ],
        whyWorks: [
          "Reduces anxiety for non-specialist teachers",
          "Builds long-term sustainability",
          "Ensures high-quality learning outcomes"
        ],
        bestFor: [
          "Teachers new to STEAM",
          "Schools embedding change over time",
          "Leaders focused on consistency and impact"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen pt-12 pb-32">
      <nav className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to ThynkLab</span>
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
        <span className="block text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
          IMPLEMENTATION HUB
        </span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
          The Ecosystem for Success
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          We provide the digital infrastructure to run your makerspace and the professional learning to master the Method.
        </p>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map(card => (
              <div 
                key={card.id} 
                className={`p-10 md:p-14 rounded-[40px] flex flex-col justify-between transition-all duration-500 group border ${
                  card.isCore 
                    ? 'bg-white border-thynk-purple/20 shadow-[0_30px_60px_-15px_rgba(124,58,237,0.08)]' 
                    : 'bg-thynk-gray border-transparent hover:bg-white hover:shadow-xl hover:border-gray-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                    {card.isCore && (
                      <span className="px-3 py-1 bg-thynk-purple/5 text-thynk-purple text-[8px] font-black tracking-widest uppercase rounded-full">CORE SYSTEM</span>
                    )}
                  </div>
                  <p className="text-gray-500 font-light text-lg leading-relaxed mb-12">{card.desc}</p>
                </div>
                
                <button 
                  onClick={() => setActiveSection(card)}
                  className="text-[10px] font-bold tracking-widest uppercase text-thynk-purple flex items-center space-x-2 transition-opacity hover:opacity-70"
                >
                  <span>Explore Service</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-10">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">The Journey Begins Here.</h2>
          <p className="text-base text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you need the platform, the training, or the long-term support, we are your partner in building a future-ready school.
          </p>
        </div>
        
        <div className="pt-2">
          <Link 
            to="/contact" 
            className="group inline-flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-thynk-purple uppercase transition-all hover:opacity-70"
          >
            <span>Connect with us</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 transition-transform group-hover:translate-x-1.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Modal 
        isOpen={!!activeSection} 
        onClose={() => setActiveSection(null)} 
        title={activeSection?.title || ''}
      >
        {activeSection && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-thynk-purple">The Offering</h4>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">{activeSection.details.whatIs}</p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-thynk-purple">{activeSection.details.learnHeading}</h4>
              <ul className="space-y-4">
                {activeSection.details.learnItems.map((item, i) => (
                  <li key={i} className="flex items-start space-x-4 text-base md:text-lg text-gray-500 font-light leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-thynk-purple mt-2.5 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-thynk-purple">Strategic Value</h4>
                <ul className="space-y-4">
                  {activeSection.details.whyWorks.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm md:text-base text-gray-400 font-light leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-gray-200 mt-2.5 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-thynk-purple">Ideal For</h4>
                <ul className="space-y-4">
                  {activeSection.details.bestFor.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm md:text-base text-gray-400 font-light leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-gray-200 mt-2.5 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => {
                  setActiveSection(null);
                  navigate('/contact');
                }}
                className="px-10 py-5 border border-gray-200 rounded-full text-[11px] font-bold tracking-widest uppercase hover:border-thynk-purple transition-all"
              >
                Request Consultation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Services;
