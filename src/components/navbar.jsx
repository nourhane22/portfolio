import "./Navigation.css"; // custom CSS file

export default function Navigation() {
  return (  
    <><nav>
      <div className="info">
        <p></p>
      </div>
      <div className="log">
        <p><a href="#"> Nourhane's Portfolio</a></p>
      </div>
      <div className="toggle-btn">
        <button className="burger"></button>
      </div>
    </nav>
    <div className="overlay">
      <div className="overlay-menu">
        <div className="menu-item">
          <p><a id="active" href="#">HOME</a></p>
        </div>
          <div className="menu-item">
          <p><a href="#">WORK</a></p>
        </div>
           <div className="menu-item">
          <p><a href="#">SKILLS</a></p>
        </div>
           <div className="menu-item">
          <p><a href="#">CONTACT</a></p>
        </div>
        <div className="sub-nav">
          <p><a href="#">Instagram</a></p>
          <p>·</p>
           <p><a href="#">LINKDIN</a></p>
          <p>·</p>
            <p><a href="#">WHATUP</a></p>
         <p>·</p>
        </div>
      </div>
    </div>
    </>


     );
        } 