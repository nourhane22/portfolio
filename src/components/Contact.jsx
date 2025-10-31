import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ConnectUs from './Touch';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Conect.css';
import {
  FaReact,
  FaCss3Alt,
  FaJsSquare,
  FaGithub,
  FaGitAlt,
} from 'react-icons/fa';
import { SiGreensock } from 'react-icons/si'; // GSAP icon

export default function Contact() {
  const containerRef = useRef(null);
  const skillCardsRef = useRef([]);

  const skills = [
    {
      icon: <FaReact />,
      name: 'React',

    },
    {
      icon: <FaCss3Alt />,
      name: 'CSS',
 
    },
    {
      icon: <SiGreensock />,
      name: 'GSAP',
    },
    {
      icon: <FaJsSquare />,
      name: 'JavaScript',
      
    },
    {
      icon: <FaGitAlt />,
      name: 'Git ',
    },
    {
      icon: <FaGithub />,
      name: 'Github',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      '.skills-header h1',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
      .fromTo(
        '.skills-header .subtitle',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        '.skill-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="social-container">
      <div className="skills-section">
        <header className="skills-header">
          <h1>My Skills</h1>
          <p className="subtitle">
            A collection of tools and technologies I use to build clean,
            <br />
            responsive, and user-focused digital experiences.
          </p>
        </header>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card"
              ref={(el) => (skillCardsRef.current[index] = el)}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
<div className="touch">
              <ConnectUs />

      </div>
    </div>
  );
}
