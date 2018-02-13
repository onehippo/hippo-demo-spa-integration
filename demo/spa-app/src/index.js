import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CmsPage from './cms-components/page';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/:contextPath(site)?/:preview(_cmsinternal)?/:pathInfo*" component={CmsPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);