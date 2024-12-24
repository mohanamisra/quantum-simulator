import './Gate.css'

const Gate = ({name, symbol, draggable}) => {

    const handleDragStart = (e) => {
        const gateData = JSON.stringify({ name, symbol });
        e.dataTransfer.setData("text/plain", gateData);
    };

    return (
        <div className="gate" draggable={draggable} onDragStart={handleDragStart}>
            <span>{symbol}</span>
        </div>
    );
};

export default Gate;