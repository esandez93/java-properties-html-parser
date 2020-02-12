import React from 'react';
import './Button.css';

const Button = (props) => {
  const {
    children,
    ...other
  } = props;

  return (
    <button className="Button" {...other}>
      {children}
    </button>
  );
};

export default Button;
