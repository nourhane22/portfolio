import "./Project.css";

// Projects.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins (ScrollTrigger is needed for scroll animations)
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // Sample projects data - replace with your own data or pass as props
  const projects = [
    {
      id: 1,
      title: 'manage landing page master',
      description: 'Manage Landing Page – A modern, responsive landing page built as part of a Frontend Mentor challenge. It showcases clean UI design with well-structured sections including hero, features, testimonials, and a call-to-action. I focused on accessibility, semantic HTML, and reusable CSS components while ensuring the site adapts seamlessly across devices.',
      technologies: ['HTML', 'CSS'],
      image: '/public/Screenshot 2025-09-24 184512.png', // Replace with your image URL
      liveUrl: 'https://manage-landing-page-master-iota.vercel.app'
    },
    {
      id: 2,
      title: 'Clipboard landing page',
      description: 'A clean and responsive landing page built as part of a Frontend Mentor challenge ,This project allowed me to practice structuring reusable components, applying responsive layouts, and delivering a professional user experience.',
      technologies: ['HTML', 'CSS', 'Javascript'],
      image: '/public/Screenshot 2025-09-24 184754.png', // Replace with your image URL
      liveUrl: 'https://clipboard-landing-page-master.vercel.app'
    },
    // Add more projects as needed
     {
      id: 3,
      title: 'Conference ticket generator',
      description: 'A dynamic landing/project page made for generating conference tickets, built as a Frontend Mentor-style challenge. The app demonstrates interactive functionality with a real-time ticket generator and user-friendly interface,',
      technologies: ['React', 'CSS','React Router'],
      image: '/public/Screenshot 2025-09-24 185558.png', // Replace with your image URL
      liveUrl: 'https://coding-con.netlify.app'
    },
  ];

  useEffect(() => {
    // Scroll-triggered animation: Cards fade in and slide up as they enter viewport
    gsap.utils.toArray('.projects').forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60 // Start slightly below
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.2, // Staggered animation
          scrollTrigger: {
            trigger: card,
            start: 'top 85%', // Trigger when top of card hits 85% from top of viewport
            toggleActions: 'play none none reverse' // Play on enter, reverse on leave
          }
        }
      );
    });

    // Hover animation: Scale card and animate arrow on mouse enter/leave
    gsap.utils.toArray('.project-card').forEach((card) => {
      const arrow = card.querySelector('.arrow');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
        if (arrow) {
          gsap.to(arrow, {
            rotation: 45, // Rotate arrow for hover effect
            x: 5, // Slight move forward
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        if (arrow) {
          gsap.to(arrow, {
            rotation: 0,
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array to run once on mount

  return (

    <>
    <section className="projects">
        <div className="projects-title"> My <span className="highlight">Projects</span></div>
           <div className="title-underline"></div>

    <div className="projects-container">
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <img src={project.image} alt={project.title} className="project-image" />
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="tech-stack">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
              Visit Live Site <span className="arrow">→</span>
            </a>
          </div>
        </div>
      ))}
    </div>

    </section>
  
    </>
  );
};

export default Projects;


   