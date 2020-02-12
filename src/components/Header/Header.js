import React from 'react';
import './Header.css';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Button } from '..';

const Header = () => {
  return (
    <div className="Header">
      <Switch>
        <Route exact path="/">
          <div></div>
          <h1>Java Properties - HTML parser</h1>
          <div></div>
        </Route>

        <Route exact path="/preview">
          <Link to="/">
            <Button>
              Back
            </Button>
          </Link>
          <h1>HTML Preview</h1>
          <div></div>
        </Route>
      </Switch>
    </div>
  );
};

export default Header;
