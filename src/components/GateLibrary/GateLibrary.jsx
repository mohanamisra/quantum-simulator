import {useState} from "react";
import './GateLibrary.css'
import Gate from "../Gate/Gate.jsx"
import {gatesMap} from "../data/gatesMap.js"

const GateLibrary = () => {
    const [gates, setGates] = useState(['and', 'or', 'not']);

    return (
        <section className="gate-library">
            <h2>Gates</h2>
            <div className = "gate-repo">
                {gates.map((gate, index) => {
                    return (
                        <Gate key = {index}
                              name={gate}
                              symbol={gatesMap[gate].symbol}
                              type={gatesMap[gate].type}
                              draggable={true}/>
                    )
                })}
            </div>
        </section>
    );
};

export default GateLibrary;