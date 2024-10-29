import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const createParticle = (e: React.MouseEvent) => {
    if (!particlesRef.current) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    const rect = particlesRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particlesRef.current.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { scale: 0.8, opacity: 0, rotate: -10 },
        visible: {
          scale: 1,
          opacity: 1,
          rotate: 0,
          transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.4
          }
        }
      }}
      whileHover={{ scale: 1.05 }}
      className="relative chakra-container bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden shadow-xl"
      onMouseMove={createParticle}
      onClick={onClick}
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 p-6">
        <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <h3 className="scroll-text text-2xl font-bold mb-3 text-naruto-orange">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-chakra-blue/20 text-chakra-blue rounded-full text-sm
               border border-chakra-blue/50 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <motion.button
          className="mt-4 w-full py-2 rounded-md bg-naruto-orange text-white font-semibold
           hover:bg-naruto-orange/80 transition-colors duration-300"
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}