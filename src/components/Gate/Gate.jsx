import './Gate.css'

const Gate = ({operator, symbol, draggable, onDragStart}) => {
    return (
        <div className="gate" draggable={draggable} onDragStart={onDragStart}>
            <span>{symbol}</span>
        </div>
    );
};

export default Gate;