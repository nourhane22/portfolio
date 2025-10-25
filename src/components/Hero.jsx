import { useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  useEffect(() => {
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

    gsap.fromTo(
      ".hero img",
      { y: 100, opacity: 0, rotate: 0 },
      { y: 0, opacity: 1, rotate: 90, duration: 1, delay: 0.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="hero">
      <div className="preloader">
        <div className="hero-title">
          <img src="/download__12_-removebg-preview.png" alt="Hero icon" />
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
          <h1>(SCROLL) </h1>
        </div>

      </div>
    </section>
  );
}