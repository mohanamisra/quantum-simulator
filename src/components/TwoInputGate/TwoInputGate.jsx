import React from 'react';
import './TwoInputGate.css';

const TwoInputGate = ({ gate, top, bottom }) => {
    const lineHeight = Math.abs(bottom - top);

    return (
        <div className="wire-gate gate type2"
             style={{
                 top: `${top - 69}px`,
             }}
        >
            <span>{gate.symbol}</span>
            <div
                className="vertical-line"
                style={{
                    height: `${lineHeight}px`,
                }}
            ></div>
        </div>
    );
};

export default TwoInputGate;
