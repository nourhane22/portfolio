import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConnectUs.css';

gsap.registerPlugin(ScrollTrigger);

const ConnectUs = () => {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const descRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Marquee animation
  useEffect(() => {
 const marqueeItems = gsap.utils.toArray('.marquee h1');
    
    if (marqueeItems.length > 0) {
      const items = gsap.utils.toArray(marqueeItems);
      const config = { repeat: -1, paddingRight: 30, speed: 1 };
      
      let length = items.length;
      let startX = items[0].offsetLeft;
      let widths = [];
      let xPercents = [];
      let pixelsPerSecond = (config.speed || 1) * 100;
      let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

      gsap.set(items, {
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] =
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            parseFloat(gsap.getProperty(el, "xPercent"));
          return xPercents[i];
        }
      });

      gsap.set(items, { x: 0 });

      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" }
      });

      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        
        tl.to(
          item,
          {
            xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
            duration: distanceToLoop / pixelsPerSecond
          },
          0
        ).fromTo(
          item,
          {
            xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          },
          {
            xPercent: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false
          },
          distanceToLoop / pixelsPerSecond
        );
      }

      tl.progress(1, true).progress(0, true);
    }  } );


  // Scroll animations
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".description h2", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(".description p", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
      .fromTo(".info-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15
      }, "-=0.5")
      .fromTo(".contact-form", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5");

    return () => tl.kill();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div ref={containerRef} className="connect-us-container">
      {/* Marquee Section */}
              <div className="card-marquee">
            <div className="marquee" ref={marqueeRef}>
  <h1>LET'S BUILD SOMETHING</h1>
<h1>COLLABORATE WITH ME</h1>
<h1>CREATIVE PROJECTS WELCOME</h1>
<h1>DESIGN · DEVELOPMENT · IDEAS</h1>
<h1>LET'S WORK TOGETHER</h1>
<h1>BRING YOUR VISION TO LIFE</h1>


            </div>
          </div>

      {/* Content Section */}
      <div className="content-section">
        <div ref={descRef} className="description">
          <h2>Get in Touch</h2>
          <p>Have a project in mind? Send me a message and let's collaborate.</p>
          <div className="contact-info">
            <div className="info-item">
              <h4>Email</h4>
              <p>hello@example.com</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <h4>Location</h4>
              <p>New York, USA</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ConnectUs;