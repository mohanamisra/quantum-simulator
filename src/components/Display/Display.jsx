import {useState} from "react";
import './Display.css'

const Display = () => {
    const [gatesList, setGatesList] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("dragging over");
    }

    const handleDrop = (e) => {
        if(gatesList.length < 5) {
            const newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            setGatesList([...gatesList, newGate]);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }

    return (
        <section className="display">
            <h2>Simulator</h2>
            <div className="circuit-area">
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <span className="qubit-name">q[0]</span>
                    <input className="wire-input"/>
                    <div className="wire"></div>
                    <div className = "wire-gates-area">
                        {gatesList.map((gate, index)=> {
                            return(
                                <div key = {index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span className="wire-output">X</span>
                </div>
            </div>
        </section>
    );
};

export default Display;