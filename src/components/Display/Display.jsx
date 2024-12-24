import {useState, useEffect} from "react";
import './Display.css'

const Display = () => {
    const [gatesList1, setGatesList1] = useState([
        // MOCK DATA TO USE IN DEV
        {name:"and", symbol: ".", type: 2},
        {name:"or", symbol: "+", type: 2},
        {name:"not", symbol: "~", type: 1},
        {name:"or", symbol: "+", type: 2},
        {name:"and", symbol: "~", type: 1},
    ]);
    const [wireOutput1, setWireOutput1] = useState(0)

    const [gatesList2, setGatesList2] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [wireOutput2, setWireOutput2] = useState(0)

    const [gatesList3, setGatesList3] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [wireOutput3, setWireOutput3] = useState(0)

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("dragging over");
    }

    const calculateWireOutput = (inputA, operator, inputB=0) => {
        let newOutput;
        switch(operator) {
            case "not":
                newOutput = Number(!inputA);
                break;
            case "and":
                // && two inputs
                break;
        }
        return newOutput;
    }

    const handleDrop1 = (e) => {
        if(gatesList1.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList1.length, ...newGate};
            setGatesList1([...gatesList1, newGate]);

            const newOutput = calculateWireOutput(wireOutput1, newGate.name);
            console.log(newOutput);
            setWireOutput1(newOutput);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    const handleDrop2 = (e) => {
        if(gatesList2.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList2.length, ...newGate};
            console.log(newGate);
            setGatesList2([...gatesList2, newGate]);

            const newOutput = calculateWireOutput(wireOutput2, newGate.name);
            setWireOutput2(newOutput);
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

            const newOutput = calculateWireOutput(wireOutput3, newGate.name);
            setWireOutput3(newOutput);
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
                    <div className="wire-input">|0⟩</div>
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList1.map((gate, index) => {
                            if(gate.type === 1) {
                                return (
                                    <div key={index} className="wire-gate gate">
                                        <span>{gate.symbol}</span>
                                    </div>
                                )
                            }
                            else if(gate.type === 2) {
                                console.log(gate.symbol);
                            }
                        })}
                    </div>
                    <div className="wire-output">{wireOutput1}</div>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop2}>
                    <span className="qubit-name">q[0]</span>
                    <div className="wire-input">|0⟩</div>
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
                    <div className="wire-output">{wireOutput2}</div>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop3}>
                    <span className="qubit-name">q[0]</span>
                    <div className="wire-input">|0⟩</div>
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
                    <div className="wire-output">{wireOutput3}</div>
                </div>
            </div>
        </section>
    );
};

export default Display;