import "./Input.scss";

function Input({className, type, name, placeholder, disabled, onChange, value}) {
  
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
