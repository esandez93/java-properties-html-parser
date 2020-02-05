import React from 'react';
import './Footer.css';

import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';

const IconText = (props) => {
  return (
    <div className="IconText" onClick={props.onClick}>
      <img src={props.icon} alt="icon" />
      <span>{props.text}</span>
    </div>
  );
}

const Footer = () => (
  <div className="Footer">
    <div>
      Developed with ❤ by Eric Sández
    </div>

    <div>
      <IconText icon={linkedin} text="Eric Sández" onClick={() => { window.open('https://www.linkedin.com/in/esandez93','_blank') }}/>
      <IconText icon={github} text="/esandez93" onClick={() => { window.open('https://github.com/esandez93', '_blank') }} />
    </div>
  </div>
);

export default Footer;
