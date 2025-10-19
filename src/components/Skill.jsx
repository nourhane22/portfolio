// Projects.jsx
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skill.css";
import Connect from './Contect.jsx'

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  // ----- DATA ABOVE RETURN -----
  const projects = [
    {
      id: 1,
      title: "manage landing page master",
      description:
        "Manage Landing Page – modern responsive landing page. Focus on accessibility, semantic HTML and reusable CSS. Adapts across devices.",
      technologies: ["HTML", "CSS"],
      image: "/public/Screenshot 2025-09-24 184512.png",
      liveUrl: "https://manage-landing-page-master-iota.vercel.app",
    },
    {
      id: 2,
      title: "Clipboard landing page",
      description:
        "Clean responsive landing page built for a Frontend Mentor challenge. Practiced reusable components and responsive layouts.",
      technologies: ["HTML", "CSS", "Javascript"],
      image: "/public/Screenshot 2025-09-24 184754.png",
      liveUrl: "https://clipboard-landing-page-master.vercel.app",
    },
    {
      id: 3,
      title: "Conference ticket generator",
      description:
        "Dynamic project page for generating conference tickets. Demonstrates real-time interaction and simple UX patterns.",
      technologies: ["React", "CSS", "React Router"],
      image: "/public/Screenshot 2025-09-24 185558.png",
      liveUrl: "https://coding-con.netlify.app",
    },
  ];

  // ----- GSAP ANIMATIONS -----
  useEffect(() => {
    // entrance animation for each card
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // hover scale + arrow move
    gsap.utils.toArray(".project-card").forEach((card) => {
      const arrow = card.querySelector(".arrow");
      const enter = () => {
        gsap.to(card, { scale: 1.02, duration: 0.25, ease: "power2.out" });
        if (arrow) gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(card, { scale: 1, duration: 0.25, ease: "power2.out" });
        if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      // cleanup listeners on unmount via ScrollTrigger kill (below) but remove listeners explicitly too
      card._cleanup = () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      // remove listeners
      gsap.utils.toArray(".project-card").forEach((card) => {
        if (card._cleanup) card._cleanup();
      });
      // kill ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ----- RETURN UI -----
  return (
    <><section className="projects-section">
      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-content">
              <div className="project-container">

                <h3 className="work-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="tech-stack">
                  {project.technologies.map((t) => (
                    <span className="tech-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

              </div>



              <a
                className="live-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Live Site <span className="arrow">→</span>
              </a>



            </div>

          </article>
        ))}
        <section className="work">
        <Connect />
      </section>
      </div>
   
    </section>
   
      </>
  );
}
