import React from "react";
import "components/Button.scss";

const Button = props => {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  if (props.danger) {
    buttonClass += " button--danger";
  }

  const disabled = true;

  const handleClick = () => console.log("button Clicked");

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
