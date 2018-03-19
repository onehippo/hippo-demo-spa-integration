import React from 'react';
import { Link } from 'react-router-dom'
import { getConfigurationForPath } from '../../utils/get-configuration-for-path';
import { baseUrls } from '../../env-vars';

export default class CmsMenu extends React.Component {
  renderMenu(configuration, pageModel, preview) {
    return configuration.models.menu.siteMenuItems.map((menuItem) => {
      return (
        <CmsMenuItem configuration={menuItem} preview={preview} key={menuItem.name} />
      )
    });
  }

  render() {
    const pageModel = this.props.pageModel;
    const preview = this.props.preview;

    let configuration;
    // if no path is set, use supplied container configuration
    if (!this.props.path) {
      configuration = this.props.configuration;
    } else {
      configuration = getConfigurationForPath(this.props.path, pageModel);
    }

    if (!configuration || !configuration.models || !configuration.models.menu
      || !configuration.models.menu.siteMenuItems || configuration.models.menu.siteMenuItems.length === 0) {
      return null;
    }

    return (
      <ul className="navbar-nav mr-auto">
        { this.renderMenu(configuration, pageModel, preview) }
      </ul>
    );
  }
}

class CmsMenuItem extends React.Component {
  render() {
    const configuration = this.props.configuration;

    if (!configuration) {
      return null;
    }

    let active;
    if (configuration.selected) {
      active = <span className="sr-only">(current)</span>;
    }

    // need to modify URLs as these are not correctly outputted by API
    // TODO: remove once links are outputted by API correctly
    const url = configuration.hstLink.url.replace('resourceapi/', '').replace('resourceapi', '').replace(baseUrls.cmsBaseUrl, '');

    return (
      <li className="nav-item">
        <Link className="nav-link" to={url}>{configuration.name}{active}</Link>
        {/*<a className="nav-link" href={url}>{configuration.name}{active}</a>*/}
      </li>
    );
  }
}