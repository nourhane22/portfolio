
import './App.css'
import Navigation from './components/navbar.jsx'

import Projects from './components/projects.jsx'
import  About from './components/AboutMe.jsx'
function App() {
return (
  <>

    <div className="App">
       <Navigation />
    </div>
       <About/>
       <Projects/> 
  
  </>
 )

}

export default App
