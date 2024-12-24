import './Gate.css'

const Gate = ({name, symbol, type, draggable}) => {

    const handleDragStart = (e) => {
        const gateData = JSON.stringify({ name, symbol , type});
        e.dataTransfer.setData("text/plain", gateData);
    };

    return (
        <div className="gate" draggable={draggable} onDragStart={handleDragStart}>
            <span>{symbol}</span>
        </div>
    );
};

export default Gate;