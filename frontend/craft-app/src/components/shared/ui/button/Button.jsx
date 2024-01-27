import "./Button.scss";

function Button(props) {
  const { btnText, onClick, className } = props;
  return (
    <button type="submit" className={className} onClick={onClick}>
      {btnText}
    </button>
  );
}

export default Button;
