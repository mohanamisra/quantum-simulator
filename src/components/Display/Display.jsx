import {useState} from "react";
import './Display.css'

const Display = () => {
    const [gatesList1, setGatesList1] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [gatesList2, setGatesList2] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [gatesList3, setGatesList3] = useState([
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

    const handleDrop1 = (e) => {
        if(gatesList1.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList1.length, ...newGate};
            setGatesList1([...gatesList1, newGate]);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    const handleDrop2 = (e) => {
        if(gatesList2.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList2.length, ...newGate};
            setGatesList2([...gatesList2, newGate]);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    const handleDrop3 = (e) => {
        if(gatesList3.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList3.length, ...newGate};
            setGatesList3([...gatesList3, newGate]);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }

    return (
        <section className="display">
            <h2>Simulator</h2>
            <div className="circuit-area">
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop1}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        type="text"
                        maxLength="1"
                        onInput={(e) => {
                            if (!['0', '1'].includes(e.target.value)) {
                                e.target.value = ''; // Clear invalid input
                            }
                        }}
                    />
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList1.map((gate, index) => {
                            return(
                                <div key = {index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span className="wire-output">X</span>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop2}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        type="text"
                        maxLength="1"
                        onInput={(e) => {
                            if (!['0', '1'].includes(e.target.value)) {
                                e.target.value = ''; // Clear invalid input
                            }
                        }}
                    />

                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList2.map((gate, index) => {
                            return (
                                <div key={index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <span className="wire-output">X</span>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop3}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        type="text"
                        maxLength="1"
                        onInput={(e) => {
                            if (!['0', '1'].includes(e.target.value)) {
                                e.target.value = ''; // Clear invalid input
                            }
                        }}
                    />
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList3.map((gate, index) => {
                            return (
                                <div key={index} className="wire-gate gate">
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