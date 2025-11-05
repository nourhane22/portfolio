import "./Project.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Skill from "./Skill";
import Lenis from "@studio-freight/lenis";

export default function Projects() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis setup
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      direction: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top+=100% bottom",
        end: "+=500vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          gsap.to(".scroll-track", {
            xPercent: -150 * self.progress,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "center bottom",
        end: "+=400vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          gsap.to(".scroll-track", {
            xPercent: -150 * self.progress,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="container">
      <section className="wrapper" ref={wrapperRef}>
        <div className="scroll-track">
          <h1 className="project-title">My Recent Work</h1>
        </div>
      </section>
      <section className="outro">
        <Skill />
      </section>
    </div>
  );
}
