import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import packageJson from '../package.json';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById('root');

const render = (Component) => ReactDOM.render(
  <BrowserRouter basename={packageJson.name}>
    <Component />
  </BrowserRouter>,
  root
);

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
