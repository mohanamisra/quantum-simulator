import './Gate.css'

const Gate = ({operator, symbol}) => {
    return (
        <div className="gate">
            <span>{symbol}</span>
        </div>
    );
};

export default Gate;