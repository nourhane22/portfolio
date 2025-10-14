import "./Conect.css"
export default function Connect (){
    return(
        <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get in <span className="highlight">Contact</span></h2>
         <div className="title-underline"></div>
        <p className="contact-subtitle">
          Feel free to reach out for collaborations, projects, or just a friendly chat!
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          <p>📧 <a href="mailto:youremail@example.com">nourhanebek2@gmail.com</a></p>
       
        </div>
 
      </div>
    </section>

    );
}

