import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Navigation.css";
import Hero from "./Hero";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const subNavRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        subNavRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  return (
    <>
      <nav className={isOpen ? "active" : ""}>
        <div className="navbar">
          <div className="logo">
            <p>
              <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
                Nourhane's Portfolio
              </a>
            </p>
          </div>
          <div className="toggle-btn">
            <button
              className="burger"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            ></button>
          </div>
        </div>
      </nav>

      <div
        className="overlay"
        ref={overlayRef}
        style={{ display: isOpen ? "flex" : "none" }}
        onClick={closeMenu}
      >
        <div className="overlay-menu" onClick={(e) => e.stopPropagation()}>
          {[
            { text: "HOME", id: "#home" },
            { text: "WORK", id: "#work" },
            { text: "SKILLS", id: "#skills" },
            { text: "CONTACT", id: "#contact" },
          ].map((item, i) => (
            <div
              key={i}
              className="menu-item"
              ref={(el) => (menuItemsRef.current[i] = el)}
            >
              <p>
                <a href={item.id} onClick={(e) => handleNavClick(e, item.id)}>
                  {item.text}
                </a>
              </p>
            </div>
          ))}

          <div className="sub-nav" ref={subNavRef}>
            <p>
              <a href="https://www.instagram.com/by_nourhanne?igsh=cHcyd2h5Ym92bzI1" target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
            <p>·</p>
            <p>
              <a href="https://www.linkedin.com/in/nourhanne-bekhadra-b20904320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_ap" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            <p>·</p>
            <p>
              <a href="https://wa.me/qr/MRIJCJGYYOWPD1" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </p>
            <p>·</p>
          </div>
        </div>
      </div>

      <div className="hero-comp">
        <Hero />
      </div>
    </>
  );
}
