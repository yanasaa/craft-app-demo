import "./Input.scss";

function Input(props) {
  const { className, type, name, placeholder } = props;
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default Input;
