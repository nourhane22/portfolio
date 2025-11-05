import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import "./Hero.css";

export default function Hero() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
      direction: "vertical",
    });

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP animations
    gsap.fromTo(
      ".title-span",
      { y: "100%" },
      { y: "0%", duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-title h1",
      { y: "100%" },
      { y: "0%", duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-description p",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4.out" }
    );

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="preloader">
        <div className="hero-title">
          <h1 className="hero-h1">
            Code & <span className="title-span">Interaction</span>
          </h1>
        </div>
        <div className="hero-description">
          <p>
            Front-end development with soul
            <br />
            Smooth motion. Sharp design. Real impact.
          </p>
        </div>
        <div className="scroll-text">
          <h1>(SCROLL)</h1>
        </div>
      </div>
    </section>
  );
}
