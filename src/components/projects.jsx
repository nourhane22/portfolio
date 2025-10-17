import "./Project.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {  useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);
  const cardsRef = useRef([]);

  // Sample projects data - replace with your own data or pass as props
  const projects = [
    {
      id: 1,
      number: '01',
      title: 'manage landing page master',
      description: 'Manage Landing Page – A modern, responsive landing page built as part of a Frontend Mentor challenge. It showcases clean UI design with well-structured sections including hero.',
      technologies: ['HTML', 'CSS'],
      image: '/public/Screenshot 2025-09-24 184512.png',
      liveUrl: 'https://manage-landing-page-master-iota.vercel.app',
      meta: 'DESIGN & DEVELOPMENT • MAY 2024'
    },
    {
      id: 2,
      number: '02',
      title: 'Clipboard landing page',
      description: 'A clean and responsive landing page built as part of a Frontend Mentor challenge. This project allowed me to practice structuring reusable components, applying responsive layouts, and delivering a professional user experience.',
      technologies: ['HTML', 'CSS', 'Javascript'],
      image: '/public/Screenshot 2025-09-24 184754.png',
      liveUrl: 'https://clipboard-landing-page-master.vercel.app',
      meta: 'DESIGN & DEVELOPMENT • JUNE 2024'
    },
    {
      id: 3,
      number: '03',
      title: 'Conference ticket generator',
      description: 'A dynamic landing/project page made for generating conference tickets, built as a Frontend Mentor-style challenge. The app demonstrates interactive functionality with a real-time ticket generator and user-friendly interface.',
      technologies: ['React', 'CSS', 'React Router'],
      image: '/public/Screenshot 2025-09-24 185558.png',
      liveUrl: 'https://coding-con.netlify.app',
      meta: 'DESIGN & DEVELOPMENT • JULY 2024'
    },
  ];


  return (
    <section className="projects" ref={projectsRef}>
      <div className="projects-sidebar">
        <h2 className="projects-title">
          work &#8213; <span className="highlight">  work</span>
        </h2>
      </div>

      <div className="projects-main">

        <div className="projects-container">
          {projects.map((project, index) => (
            <div 
              className="project-card" 
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="project-header">
                <div className="project-number">{project.number}</div>
              <h3 className="project-title">{project.title}</h3>

              </div>
              
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-image" 
              />
              <div className="project-content">
                <div className="project-meta">{project.meta}</div>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="live-link"
                >
                  View the project <span className="arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Projects;