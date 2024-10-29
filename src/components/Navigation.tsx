import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavControls = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling down 100px
      setIsVisible(window.scrollY > 100);
      
      // Update active section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-full p-2 shadow-lg border border-chakra-blue/20">
        <div className="flex space-x-2">
          {['home', 'projects', 'contact'].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeSection === section 
                  ? 'bg-naruto-orange text-white' 
                  : 'text-gray-300 hover:text-white'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// ProjectDetails component to handle modal display
const ProjectDetails = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Project Content */}
            <div className="relative">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
            </div>

            <div className="p-8">
              <h2 className="scroll-text text-4xl font-bold mb-6 text-naruto-orange">
                {project.title}
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-300">
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-chakra-blue/20 text-chakra-blue rounded-full text-sm
                               border border-chakra-blue/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-naruto-orange text-white rounded-lg
                               hover:bg-naruto-orange/80 transition-colors"
                    >
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border-2 border-chakra-blue text-chakra-blue rounded-lg
                               hover:bg-chakra-blue/10 transition-colors"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { NavControls, ProjectDetails };