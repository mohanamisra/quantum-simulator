import {useState} from "react";
import './GateLibrary.css'
import Gate from "../Gate/Gate.jsx"

const GateLibrary = () => {
    const gateSymbolMap = {
        'and' : '.',
        'or' : '+',
        'not' : '~',
    }

    const [gates, setGates] = useState(['and', 'or', 'not']);

    return (
        <section className="gate-library">
            <h2>Gates</h2>
            <div className = "gate-repo">
                {gates.map((gate, index) => {
                    return (
                        <Gate key = {index}
                              operator={gate}
                              symbol={gateSymbolMap[gate]}
                              draggable={true}/>
                    )
                })}
            </div>
        </section>
    );
};

export default GateLibrary;