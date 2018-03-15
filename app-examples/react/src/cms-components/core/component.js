import React from 'react';
import CmsContainer from './container';

export default class CmsComponent extends React.Component {
  renderComponentWrapper(configuration, pageModel, preview) {
    // based on the name of the container, render a different wrapper
    switch (configuration.name) {
      // add additional cases here if you need custom HTML wrapped around any of the components
      default:
        return (
          <React.Fragment>
            { this.renderComponent(configuration, pageModel, preview) }
          </React.Fragment>
        );
    }
  }

  renderComponent(configuration = { components: [] }, pageModel, preview) {
    // render all of the nested components
    if (configuration.components && configuration.components.length > 0) {
      return configuration.components.map((component) => {
        if (component.type === 'CONTAINER_COMPONENT') {
          // render container
          return (
            <CmsContainer configuration={component} pageModel={pageModel} preview={preview} key={component.id}/>
          );
        } else {
          // render regular component
          return (
            <CmsComponent configuration={component} pageModel={pageModel} preview={preview} key={component.id}/>
          );
        }
      });
    }
  }

  render() {
    const configuration = this.props.configuration;
    const pageModel = this.props.pageModel;
    const preview = this.props.preview;

    return (
      <React.Fragment>
        { configuration &&
        this.renderComponentWrapper(configuration, pageModel, preview)
        }
      </React.Fragment>
    );
  }
}