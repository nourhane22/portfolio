import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Navigation.css';
import Hero from './Hero';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const subNavRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay
      gsap.fromTo(
        overlayRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );

      // Animate menu links
      gsap.fromTo(
        menuItemsRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );

      // Animate sub navigation
      gsap.fromTo(
        subNavRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      // Animate overlay close
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav className={isOpen ? 'active' : ''}>
        <div className="info">
          <p></p>
        </div>
        <div className="logo">
          <p><a href="#">Nourhane's Portfolio</a></p>
        </div>
        <div className="toggle-btn">
          <button
            className="burger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          ></button>
        </div>
      </nav>

      <div
        className="overlay"
        ref={overlayRef}
        style={{ display: isOpen ? 'flex' : 'none' }}
        onClick={closeMenu}
      >
        <div className="overlay-menu" onClick={(e) => e.stopPropagation()}>
          {['HOME', 'WORK', 'SKILLS', 'CONTACT'].map((text, i) => (
            <div
              key={i}
              className="menu-item"
              ref={(el) => (menuItemsRef.current[i] = el)}
            >
              <p><a href="#" onClick={closeMenu}>{text}</a></p>
            </div>
          ))}

          <div className="sub-nav" ref={subNavRef}>
            <p><a href="#">Instagram</a></p><p>·</p>
            <p><a href="#">LinkedIn</a></p><p>·</p>
            <p><a href="#">WhatsApp</a></p><p>·</p>
          </div>
        </div>
      </div>

      <div className="hero-comp">
        <Hero />
      </div>
    </>
  );
}
