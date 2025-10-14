import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skill.css";

gsap.registerPlugin(ScrollTrigger);

// Custom hook to detect if element is visible in viewport
const useIsVisible = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return isVisible;
};

// Custom hook to check for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Animated Text Component
const AnimatedText = ({ children, index = 0, className = "", tag = "h2" }) => {
  const contentRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3 + 0.4 * index,
        ease: "power3.out",
      }
    );
  }, [index, prefersReducedMotion]);

  const Tag = tag;
  return (
    <Tag
      ref={contentRef}
      className={className}
      style={{ opacity: prefersReducedMotion ? 1 : 0 }}
    >
      {children}
    </Tag>
  );
};

// Main Skills Component
export default function Skill() {
  const skills = [
    // Frontend
    { name: "HTML/CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "GSAP", category: "frontend" },

    // Tools
    { name: "Git/GitHub", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "VS Code", category: "tools" },
  ];

  const categories = ["all", "frontend", "tools"];
  const [activeCategory, setActiveCategory] = useState("all");
  const skillsGridRef = useRef(null);
  const categoriesRef = useRef(null);
  const isSkillsVisible = useIsVisible(skillsGridRef, 0.2);
  const isCategoriesVisible = useIsVisible(categoriesRef, 0.2);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Animate categories when visible
  useEffect(() => {
    if (isCategoriesVisible && !prefersReducedMotion && categoriesRef.current) {
      gsap.fromTo(
        categoriesRef.current.querySelectorAll(".category-btn"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.8,
        }
      );
    }
  }, [isCategoriesVisible, prefersReducedMotion]);

  // Animate skills when visible
  useEffect(() => {
    if (isSkillsVisible && !prefersReducedMotion && skillsGridRef.current) {
      gsap.fromTo(
        skillsGridRef.current.querySelectorAll(".skill-card"),
        { scale: 0.8, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.2,
        }
      );
    }
  }, [isSkillsVisible, prefersReducedMotion]);

  // Animate skill changes when category changes
  useEffect(() => {
    if (!prefersReducedMotion && skillsGridRef.current) {
      const skillCards = skillsGridRef.current.querySelectorAll(".skill-card");
      gsap.to(skillCards, {
        scale: 0.9,
        opacity: 0.7,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            const newSkillCards =
              skillsGridRef.current?.querySelectorAll(".skill-card");
            if (newSkillCards) {
              gsap.fromTo(
                newSkillCards,
                { scale: 0.9, opacity: 0.7 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.3,
                  stagger: 0.05,
                  ease: "back.out(1.7)",
                }
              );
            }
          }, 50);
        },
      });
    }
  }, [activeCategory, prefersReducedMotion]);

  // Floating shapes parallax animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: ".skill",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".shape:nth-child(1)", { y:200 }, 0)
      .to(".shape:nth-child(2)", { y: -200 }, 0)
  }, [prefersReducedMotion]);

  return (
    <section id="about" className="skill">
      <div className="container">
        <div className="floating-shapes">
          <div className="shape" aria-hidden="true"></div>
          <div className="shape" aria-hidden="true"></div>
        </div>

        {/* Animated Title */}
        <AnimatedText className="section-title" index={0}>
          My <span className="highlight">Skills</span>
        </AnimatedText>
         <div className="title-underline"></div>

        {/* Categories */}
        <div ref={categoriesRef} className="categories">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={skillsGridRef} className="skills-grid">
          {filteredSkills.map((skill) => (
            <div
              key={`${skill.name}-${activeCategory}`}
              className="skill-card"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
