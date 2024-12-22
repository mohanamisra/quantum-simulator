import './App.css'
import Display from "./components/Display/Display.jsx";
import GateLibrary from "./components/GateLibrary/GateLibrary.jsx";


function App() {

  return (
    <div className="app-container">
        <header>
            <h1>Quantum Circuit Simulator</h1>
        </header>
        <div className="top">
            <Display/>
            <GateLibrary/>
        </div>
    </div>
  )
}

export default App
