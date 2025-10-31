import "./about-me.css";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function About(){
  const firstPRef = useRef(null);

  useEffect(() => {
    if (!firstPRef.current) return;

    const loadSplitType = async () => {
      const SplitType = (await import('split-type')).default;
      const text = new SplitType(firstPRef.current, { types: 'chars' });

      gsap.fromTo(
        text.chars,
        { opacity: 0.3 },
        {
          opacity: 1,
          color: '#141412',
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: {
            trigger: firstPRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    };

    loadSplitType();
      gsap.fromTo(
      ".about-h1",
      { y: "100%" },
       { y: "0%", duration: 1, ease: "power2.out",
        scrollTrigger:{
          trigger:".about-h1",
           start: "top 85%",
      toggleActions: "play none none reverse"
        }
       }
    );
    gsap.fromTo(
  ".animate-text",
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".animate-text",
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  }
);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return(
    <section className="about">

       <h1 className="about-h1"> ABOUT ME </h1>

      <h1 className="animate-text" ref={firstPRef}>
      <span className="text-span"> Front-end developer crafting clean interfaces with precise </span>  motion and meaningful interaction.
        I focus on performance, accessibility, and visual clarity—turning ideas into fast,
        responsive, and intuitive web experiences built with modern technologies.
      </h1>
    </section>
  )
}
