
import './App.css'
import CustoomCursor from './components/CustoomCursor.jsx'
import Navigation from './components/navbar.jsx'
import Hero from './components/hero.jsx'
import Skill from './components/Skill.jsx'
import Connect from './components/contect.jsx'
import Projects from './components/projects.jsx'
import  About from './components/AboutMe.jsx'
function App() {
return (
  <>
    <div className="App">
    
     <CustoomCursor />
    </div>
      <Navigation />
      <Hero />
      <About/>
    <Projects/> 
      <Skill/>
      <Connect/>
  
  </>
 )

}

export default App
