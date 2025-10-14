
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import './CustomCursor.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);
export default function CustoomCursor() {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);

  const handleMouseMove = useCallback((e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { 
        x: mouseX,
        y: mouseY,
        duration: 0
      });
    }
    
    trailsRef.current.forEach((trail, index) => {
      if (trail) {
        gsap.to(trail, {
          duration: 0.3 + index * 0.05,
          x: mouseX,
          y: mouseY,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
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
  );
}
