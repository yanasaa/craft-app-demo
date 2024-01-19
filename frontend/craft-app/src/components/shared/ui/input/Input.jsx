import "./Input.scss";

function Input(props) {
  const { className, type, name, placeholder, disabled } = props;
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default Input;
