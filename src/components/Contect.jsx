import "./Conect.css"
import  ConnectUs from "./touch"
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default function Connect (){
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const linksRef = useRef([]);
  const socialLinks = [
    { name: 'React' },
    { name: 'CSS' },
    { name: 'GSAP' },
    { name: 'Git/Github' }
  ];
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  tl.fromTo(
    ".social-title",
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  )
  .fromTo(
    ".social-description",
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
    "-=0.5"
  )
  .fromTo(
    ".social-link",
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    },
    "-=0.5"
  );

  return () => {
    tl.kill();
  };
}, []);


 
  

    return(
  <div ref={containerRef} className="social-container">
      <div className="social-content">
        <h1 ref={titleRef} className="social-title">My skills</h1>
        
        <p ref={descRef} className="social-description">
A collection of tools and technologies I use to build clean, responsive, and user-focused digital experiences.
        </p>

        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              ref={el => linksRef.current[index] = el}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-text">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="touch">
        <ConnectUs/>

      </div>
    </div>
 

    );
}

