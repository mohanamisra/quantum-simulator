import {useState} from "react";
import './Display.css'

const Display = () => {
    const [gatesList, setGatesList] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("dragging over");
    }

    const handleDrop = (e) => {
        console.log(e.dataTransfer.getData("text/plain"));
    }

    return (
        <section className="display">
            <h2>Simulator</h2>
            <div className="circuit-area">
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <span className="qubit-name">q[0]</span>
                    <input className="wire-input"/>
                    <div className="wire"></div>
                    <span className="wire-output">X</span>
                </div>
            </div>
        </section>
    );
};

export default Display;