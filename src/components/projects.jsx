import "./Project.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Skill from './Skill'

export default function Projects() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal scroll effect for wrapper
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "180vh",
      end: "+=500vh",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        gsap.to(wrapperRef.current, {
          x: `${-350 * self.progress}vw`,
          duration: 0.2,
          ease: "power3.out",
        });
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="container">
      <section className="wrapper" ref={wrapperRef}>
        <h1 className="project-title">My Recent Work</h1>
      </section>
      <section className="outro">
       <Skill/>
      </section>
    </div>
  );
}
