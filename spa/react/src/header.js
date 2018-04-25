import React from 'react';
import CmsMenu from './cms-components/core/menu';

export default class Header extends React.Component {
  render() {
    const pageModel = this.props.pageModel;
    const preview = this.props.preview;

    return (
      <div id="header">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <span className="navbar-brand" href="#">React Demo</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <CmsMenu path="menu" pageModel={pageModel} preview={preview} />
          </div>
        </nav>
      </div>
    );
  }
}