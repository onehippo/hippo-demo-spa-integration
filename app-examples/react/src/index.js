import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CmsPage from './cms-components/core/page';
import { baseUrls } from './env-vars';

export default class HomePage extends React.Component {
  render() {
    const pathInfo = this.props.match.params.pathInfo;
    const preview = this.props.match.params.preview;

    return (
        <CmsPage pathInfo={pathInfo} preview={preview} />
      );
    }
}

let routePath = '/:pathInfo*';
if (baseUrls.cmsChannelPath !== '') {
  routePath = `/(${baseUrls.cmsChannelPath})?` + routePath;
}
routePath = `/:preview(${baseUrls.cmsPreviewPrefix})?` + routePath;
if (baseUrls.cmsContextPath !== '') {
  routePath = `/(${baseUrls.cmsContextPath})?` + routePath;
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={routePath} component={HomePage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);