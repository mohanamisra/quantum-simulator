import './Display.css'

const Display = () => {
    return (
        <section className="display">
            <h2>Simulator</h2>
            <div className="circuit-area">
                <div className="circuit-block">
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