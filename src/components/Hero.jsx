
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger, TextPlugin } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

const Hero = () => {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);
  const heroRef = useRef(null);
  
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const typewriterTexts = [
    "Front-end Developer",
    "UI/UX Enthusiast",
    "React Specialist",
    "Creative Problem Solver"
  ]


  useGSAP(() => {
    // Split text animations
    const heroSplit = new SplitText(".hero-title", {
      type: "chars, words",
    });
    
    const subtitleSplit = new SplitText(".hero-subtitle", {
      type: "lines",
    });

    // Apply gradient class to characters
    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });
     // Set initial states
    gsap.set(heroSplit.chars, { yPercent: 100 });
    gsap.set(subtitleSplit.lines, { yPercent: 100, opacity: 0 });
    gsap.set(".scroll-indicator", { y: 20, opacity: 0 });

    // Main timeline for initial animations
    const mainTimeline = gsap.timeline();

    mainTimeline
     .to(heroSplit.chars, {
        yPercent: 0,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      })
      .to(subtitleSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.5,
      }, "-=1")
     
      .to(".scroll-indicator", {
        y: 0,
        opacity: 1,
        duration: 0.5
      }, "-=0.3");

    // Typewriter effect
    let textIndex = 0;
    const typeWriter = () => {
      gsap.to(".typewriter", {
        duration: 1.5,
        text: typewriterTexts[textIndex],
        ease: "none",
        onComplete: () => {
          gsap.delayedCall(2, () => {
            textIndex = (textIndex + 1) % typewriterTexts.length;
            typeWriter();
          });
        },
      });
    };

    // Start typewriter after initial animation
    gsap.delayedCall(2, typeWriter);

    // Floating shapes animations
    if (!isMobile) {
      gsap.set(".shape", { transformOrigin: "center center" });
      
      gsap.to(".shape:nth-child(1)", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".shape:nth-child(2)", {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".shape:nth-child(3)", {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });

      // Subtle floating animations
      gsap.to(".shape:nth-child(1)", {
        y: "+=20",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".shape:nth-child(2)", {
        x: "+=15",
        y: "+=25",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".shape:nth-child(3)", {
        x: "+=10",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }



    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(".shape:nth-child(1)", { y: 200 }, 0)
    .to(".shape:nth-child(2)", { y: -200 }, 0)
    .to(".shape:nth-child(3)", { y: 100 }, 0)
    .to(".hero-content", {
      y: -100,
      opacity: 0.8,
      ease: "none"
    }, 0);

  }, [isMobile]);

 

  return (
    <section id="hero" className="hero noisy" ref={heroRef}>
      {/* Custom Cursor - only on desktop */}
      {!isMobile && (
        <>
          <div className="cursor" ref={cursorRef}></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="cursor-trail"
              ref={(el) => (trailsRef.current[i] = el)}
            />
          ))}
        </>
      )}

      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape" aria-hidden="true"></div>
        <div className="shape" aria-hidden="true"></div>
        <div className="shape" aria-hidden="true"></div>
      </div>

      {/* Main title */}
      <h1 className="hero-title title">Welcome to My Portfolio</h1>

      {/* Hero content */}
      <div className="hero-content content">

        <div className="view-projects">
          <p className="hero-subtitle subtitle">
            I'm <span className="name-highlight">Nourhane</span>, a <span className="typewriter"></span>
            <br />
            Every project I create combines innovative design, clean code, and user-centered thinking — 
            designed to deliver exceptional digital experiences.
          </p>
     
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;