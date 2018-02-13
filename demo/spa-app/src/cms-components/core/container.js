import React from 'react';
import { getComponentMetaData } from '../../utils/cms-meta-data';
import BaseComponent from './base-component';

export default class CmsContainer extends React.Component {
  renderContainer(containerConfig, containerMetaData, content, preview) {
    // based on the name of the container, render a different wrapper
    switch (containerConfig.name) {
      // add cases here if you need custom HTML for a container
      default:
        return (
          <React.Fragment>
            { containerMetaData.start }
            <div className="hst-container">
              { this.renderComponent(containerConfig, content, preview) }
            </div>
            { containerMetaData.end }
          </React.Fragment>
        );
    }
  }

  renderComponent(containerConfig = { components: [] }, content, preview) {
    // render all of the container-items (components)
    return containerConfig.components.map((component) => {
      return (
        <BaseComponent configuration={component} content={content} key={component.id} preview={preview} />
      );
    });
  }

  render() {
    const configuration = this.props.configuration;
    const content = this.props.content;
    const preview = this.props.preview;
    let containerMetaData = {};

    // get container meta-data
    if (preview && configuration && configuration.cmsData) {
      containerMetaData = getComponentMetaData(configuration.cmsData);
    }

    return (
      <React.Fragment>
        { configuration &&
        this.renderContainer(configuration, containerMetaData, content, preview)
        }
      </React.Fragment>
    );
  }
}