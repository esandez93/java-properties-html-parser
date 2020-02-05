import React from 'react';
import './Textarea.css';

const Textarea = (props) => {
  const {
    value,
    onChange,
    placeholder
  } = props;

  const handleChange = ({ target }) => {
    if (onChange && typeof onChange === 'function')
      onChange(target.value);
  };

  return (
    <textarea
      className="Textarea"
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
