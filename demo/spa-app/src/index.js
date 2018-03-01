import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CmsPage from './cms-components/core/page';

export default class HomePage extends React.Component {
  render() {
    const pathInfo = this.props.match.params.pathInfo;
    const preview = this.props.match.params.preview;
    const contextPath = this.props.match.params.contextPath;

    return (
      <CmsPage pathInfo={pathInfo} preview={preview} contextPath={contextPath}/>
      );
    }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/:contextPath(site)?/:preview(_cmsinternal)?/:pathInfo*" component={HomePage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);