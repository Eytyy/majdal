import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';

import Home from './components/Home/Home';

import OliveCategories from './components/Olives/OlivesCategories';
import OlivesList from './components/Olives/OlivesList';

import Estates from './components/Estates/Estates';
import Estate from './components/Estates/EstateItem';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component = { Home }></Route>
    <Route path="/oils" component = { Home }></Route>
    <Route path="/estate" component = { Estates }>
      <Route path="/estate/:id" component = { Estates }></Route>
    </Route>
    <Route path="/olives" component = { OliveCategories }>
    </Route>
    <Route path="/olives/:id" component = { OlivesList }></Route>
  </Router>,
  document.getElementById('app')
);
