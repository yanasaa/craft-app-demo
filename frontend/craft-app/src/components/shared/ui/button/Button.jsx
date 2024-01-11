import "./Button.scss";

function Button(props) {
  const { btnText } = props;
  return <button className="button button_colored">{btnText}</button>;
}

export default Button;
