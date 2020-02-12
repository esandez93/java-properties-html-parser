import React, { useState } from 'react';
import './App.css';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Button,
  Textarea,
  Header,
  Footer
} from './components';
import {
  escapeAccents,
  parseHtmlToJava,
  parseJavaToHtml,
  validateHtmlStr
} from './utils';

const App = () => {
  const [ html, setHtml ] = useState('');
  const [ java, setJava ] = useState('');

  // TODO: Manage Invalid HTML
  const applyChanges = (type) => (content) => {
    if (type === 'html') {
      validateHtmlStr(content).then(() => {
        setHtml(content);
        setJava(parseHtmlToJava(content));
      }).catch(() => {
        // show invalid HTML error
        console.log('Invalid HTML');
      });
    } else if (type === 'java') {
      setJava(escapeAccents(content));

      const parsedHtml = parseJavaToHtml(content);

      validateHtmlStr(parsedHtml).then(() => {
        setHtml(parsedHtml);
      }).catch(() => {
        // show invalid HTML error
        console.log('Invalid HTML');
      });
    }
  };

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/">
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

            <Link to="/preview">
              <Button disabled={html === ''}>
                HTML Preview
              </Button>
            </Link>
          </div>

          <Footer />
        </Route>

        <Route exact path="/preview">
          <div dangerouslySetInnerHTML={{ __html: html === '' ? '<i>No HTML to preview</i>' : html }}></div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
