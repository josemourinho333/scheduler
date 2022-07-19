import React from "react";

import "components/Button.scss";
import classNames from 'classnames';

export default function Button(props) {

  let buttonClass = classNames('button', 
    props.confirm ? 'button--confirm' :
    props.danger ? 'button--danger' :
    ''
  )

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
