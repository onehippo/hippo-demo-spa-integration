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
  renderLink (configuration, active) {
    if (configuration._links && configuration._links.site && configuration._links.site.href) {
      if (configuration._links.site.type === 'internal') {
        return (<Link className="nav-link" to={configuration._links.site.href}>{configuration.name}{active}</Link>);
      } else {
        return (<a className="nav-link" href={configuration._links.site.href}>{configuration.name}{active}</a>)
      }
    }
    return null;
  }

  render() {
    const configuration = this.props.configuration;

    if (!configuration) {
      return null;
    }

    let active;
    if (configuration.selected) {
      active = <span className="sr-only">(current)</span>;
    }

    return (
      <li className="nav-item">
        { this.renderLink(configuration, active) }
      </li>
    );
  }
}