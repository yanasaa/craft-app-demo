import "./Button.scss";

function Button(props) {
  const { btnText, onClick } = props;
  return <button className="button button_colored" onClick={onClick}>{btnText}</button>;
}

export default Button;
