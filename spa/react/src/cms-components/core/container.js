import React from 'react';
import CmsContainerItem from './container-item';
import { addBeginComment, addEndComment } from '../../utils/add-html-comment';
import { getConfigurationForPath } from '../../utils/get-configuration-for-path';

export default class CmsContainer extends React.Component {
  renderContainerWrapper(configuration, pageModel, preview) {
    // based on the name of the container, render a different wrapper
    switch (configuration.name) {
      // add additional cases here if you need custom HTML for a container
      default:
        return (
          // need to wrap container inside a div instead of React.Fragment because otherwise HTML comments are not removed
          <div>
            <div className="hst-container"
                 ref={(containerElm) => { this.addMetaData(containerElm, configuration, preview); }}>
              { this.renderContainer(configuration, pageModel, preview) }
            </div>
          </div>
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

  addMetaData(htmlElm, configuration, preview) {
    addBeginComment(htmlElm, 'beforebegin', configuration, preview);
    addEndComment(htmlElm, 'afterend', configuration, preview);
  }

  render() {
    const pageModel = this.props.pageModel;
    let configuration;

    // if no path is set, use supplied container configuration
    if (!this.props.path) {
      configuration = this.props.configuration;
    } else {
      configuration = getConfigurationForPath(this.props.path, pageModel);
    }

    if (!configuration) {
      return null;
    }

    const preview = this.props.preview;

    return (
      <React.Fragment>
        { this.renderContainerWrapper(configuration, pageModel, preview) }
      </React.Fragment>
    );
  }
}