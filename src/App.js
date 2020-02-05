import React, { useState } from 'react';
import './App.css';

import {
  Textarea
} from './components';
import {
  escapeAccents,
  parseHtmlToJava,
  parseJavaToHtml
} from './utils';

const App = () => {
  const [ html, setHtml ] = useState('');
  const [ java, setJava ] = useState('');

  const applyChanges = (type) => {
    return (content) => {
      if (type === 'html') {
        setHtml(content);
        setJava(parseHtmlToJava(content));
      } else if (type === 'java') {
        setJava(escapeAccents(content));
        setHtml(parseJavaToHtml(content));
      }
    }
  };

  return (
    <div className="App">
      <div className="Header">
        Java Properties - HTML parser
      </div>

      <div className="Content">
        <div className="Block">
          <div>HTML</div>
          <Textarea
            value={html}
            onChange={applyChanges('html')}
            placeholder="Write your HTML here to parse it"
            debounce={500}
          />
        </div>

        <div className="Block">
          <div>Java Properties</div>
          <Textarea
            value={java}
            onChange={applyChanges('java')}
            placeholder="Write your Java string here to parse it"
            debounce={500}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
