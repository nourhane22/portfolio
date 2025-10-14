import "./about-me.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function AboutMeSection() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useGSAP(() => {
    // Split and animate title
    const titleSplit = new SplitText(titleRef.current, { type: "chars" });
    gsap.from(titleSplit.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.4,
    });

    // Animate paragraph lines
    const paraSplit = new SplitText(paragraphRef.current, { type: "lines" });
    gsap.from(paraSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 2,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.5,
    });
  }, []);

  return (
    <div className="about-section">
      <div className="container">
        <div className="title-wrapper">
          <h1 className="section-title" ref={titleRef}>
            About <span className="highlight">Me</span>
          </h1>
          <div className="title-underline"></div>
        </div>
        <div className="content-wrapper">
          <p className="about-text" ref={paragraphRef}>
            I’m a front-end developer with a passion for creating clean,
            interactive, and user-friendly web experiences. I enjoy working with
            modern technologies like React, JavaScript, and CSS to bring ideas
            to life. Beyond coding, I’m always exploring new design trends and
            looking for ways to blend creativity with functionality.
          </p>
        </div>
      </div>
       <div className="scroll-indicator" aria-hidden="true"></div>
    </div>
  );
}
