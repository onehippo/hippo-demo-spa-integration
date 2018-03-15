import React from 'react';
import CmsContainerItem from './container-item';

export default class CmsContainer extends React.Component {
  renderContainerWrapper(configuration, pageModel, preview) {
    // based on the name of the container, render a different wrapper
    switch (configuration.name) {
      // add additional cases here if you need custom HTML for a container
      default:
        return (
          <React.Fragment>
            <div className="hst-container">
              { this.renderContainer(configuration, pageModel, preview) }
            </div>
          </React.Fragment>
        );
    }
  }

  renderContainer(configuration = { components: [] }, pageModel, preview) {
    if (configuration.components && configuration.components.length > 0) {
      // render all of the container-item-components
      return configuration.components.map((component) => {
        return (
          <CmsContainerItem configuration={component} pageModel={pageModel} preview={preview} key={component.id}/>
        );
      });
    }
  }

  getConfigurationForPath(path, pageModel) {
    const pathSegments = path.split('/');
    let currPath;

    let configuration = pageModel.page;
    while (configuration && configuration.components && configuration.components.length > 0) {
      // match the next path segment
      currPath = pathSegments.shift();

      configuration = this.getConfigurationForPathSegment(currPath, configuration);

      if (configuration && pathSegments.length === 0) {
        // this was the last path segment and we retrieved configuration, so we can return the configuration
        return configuration;
      }
    }
    return null;
  }

  getConfigurationForPathSegment(pathSegment, configuration) {
    for (let componentIdx in configuration.components) {
      const component = configuration.components[componentIdx];
      // asterisk serves as a wildcard
      if (pathSegment === component.name || pathSegment === '*') {
        return component;
      }
    }
    return null;
  }

  render() {
    const pageModel = this.props.pageModel;
    let configuration;

    // if no path is set, use supplied container configuration
    if (!this.props.path) {
      configuration = this.props.configuration;
    } else {
      configuration = this.getConfigurationForPath(this.props.path, pageModel);
    }

    if (!configuration) {
      return null;
    }

    const preview = this.props.preview;

    // let containerMetaData = {};
    // get container meta-data
    // if (preview && configuration && configuration.cmsData) {
    //   containerMetaData = getComponentMetaData(configuration.cmsData);
    // }

    return (
      <React.Fragment>
        { this.renderContainerWrapper(configuration, pageModel, preview) }
      </React.Fragment>
    );
  }
}