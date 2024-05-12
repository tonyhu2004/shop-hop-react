// eslint-disable-next-line react/prop-types
const InputField = ({ label, type, value, onChange }) => {
    return (
        <div>
            <label>{label}:</label>
            <br />
            {type === 'textarea' ? (
                <textarea value={value} onChange={(e) => onChange(e.target.value)} />
            ) : type === 'price' ? (
                <input type="number" step="0.01" min="0" value={value} onChange={(e) => onChange(e.target.value)} />
            ) : type === 'rating' ? (
                <input type="number" step="0.1" min="0" max="5" value={value} onChange={(e) => onChange(e.target.value)} />
            ) : (
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
            )}
            <br />
            <br />
        </div>
    );
};

export default InputField;
