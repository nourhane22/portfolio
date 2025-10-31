import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import './ConnectUs.css';

gsap.registerPlugin(ScrollTrigger);

export default function ConnectUs() {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // User requested to leave IDs empty. Fill these with your EmailJS values.
    const SERVICE_ID = 'service_7wacf5h'; // e.g. 'service_xxx'
    const TEMPLATE_ID = 'template_1nl9ptw'; // e.g. 'template_xxx'
    const PUBLIC_KEY = 'thRL1SAfl6Q8KRhZj'; // e.g. 'public_xxx'

    if (!formRef.current) return;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          alert('Oops, something went wrong...');
          console.error(error);
        }
      );
  };

  // Marquee animation
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const itemsArr = Array.from(el.querySelectorAll('h1'));
    if (itemsArr.length === 0) return;

    const config = { repeat: -1, paddingRight: 30, speed: 1 };
    const pixelsPerSecond = (config.speed || 1) * 100;

    let widths = [];
    let xPercents = [];
    let startX = itemsArr[0].offsetLeft;

    gsap.set(itemsArr, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
        xPercents[i] =
          (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
          parseFloat(gsap.getProperty(el, 'xPercent'));
        return xPercents[i];
      }
    });

    gsap.set(itemsArr, { x: 0 });

    const length = itemsArr.length;

    const totalWidth =
      itemsArr[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      itemsArr[length - 1].offsetWidth * gsap.getProperty(itemsArr[length - 1], 'scaleX') +
      (parseFloat(config.paddingRight) || 0);

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });

    for (let i = 0; i < length; i++) {
      const item = itemsArr[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');

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

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.description h2', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo('.description p', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
      .fromTo('.info-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.5')
      .fromTo('.contact-form', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5');

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <div id="contact"ref={containerRef} className="connect-us-container">
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
              <p>nourhanebek2@gmail.com</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>0676 86 88 62</p>
            </div>
            <div className="info-item">
              <h4>Location</h4>
              <p>ORAN , ALGERIA</p>
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
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}
