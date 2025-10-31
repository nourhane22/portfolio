import "./about-me.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const firstPRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      direction: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!firstPRef.current) return;

    const loadSplitType = async () => {
      const SplitType = (await import("split-type")).default;
      const text = new SplitType(firstPRef.current, { types: "words" });

      gsap.fromTo(
        text.words,
        { opacity: 0.3, y: 20 },
        {
          opacity: 1,
          y: 0,
          color: "#141412",
          duration: 2,
          scrollTrigger: {
            trigger: firstPRef.current,
            start: "top center",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    };

    loadSplitType();

    gsap.fromTo(
      ".about-h1",
      { y: "100%" },
      {
        y: "0%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-h1",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="about">
      <h1 className="about-h1">ABOUT ME</h1>

      <h1 className="animate-text" ref={firstPRef}>
        <span className="text-span">
          Front-end developer crafting clean interfaces with precise motion and
          meaningful interaction.
        </span>{" "}
        I focus on performance, accessibility, and visual clarity—turning ideas
        into fast, responsive, and intuitive web experiences built with modern
        technologies.
      </h1>
    </section>
  );
}
