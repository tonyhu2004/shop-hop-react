// eslint-disable-next-line react/prop-types
const InputField = ({ label, cy, type, value, onChange }) => {
    return (
        <div>
            <label>{label}:</label>
            <br />
            {type === 'textarea' ? (
                <textarea value={value} data-cy={cy} onChange={(e) => onChange(e.target.value)} />
            ) : type === 'price' ? (
                <input type="number" data-cy={cy} step="0.01" min="0" value={value} onChange={(e) => onChange(e.target.value)} />
            ) : type === 'rating' ? (
                <input type="number" data-cy={cy} step="0.1" min="0" max="5" value={value} onChange={(e) => onChange(e.target.value)} />
            ) : (
                <input type={type} data-cy={cy} value={value} onChange={(e) => onChange(e.target.value)} />
            )}
            <br />
            <br />
        </div>
    );
};

export default InputField;
