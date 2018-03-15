import React from 'react';
import ContentComponentWrapper from './content-component-wrapper';
import UndefinedComponent from './undefined';
import { componentDefinitions } from "../../component-definitions";

export default class CmsContainerItem extends React.Component {
  renderContainerItem(component, pageModel, preview) {
    // based on the type of the component, render a different React component
    if (component.label in componentDefinitions) {
      if ("contentComponent" in componentDefinitions[component.label]
        && componentDefinitions[component.label]["contentComponent"]) {
        // wrap component in ContentComponentWrapper class
        return (
          <ContentComponentWrapper configuration={component} pageModel={pageModel} preview={preview} />
        );
      } else if (componentDefinitions[component.label].component) {
        // component is defined and does not have to be wrapped in ContentComponent, so render the actual component
        const componentEl = React.createElement(componentDefinitions[component.label].component,
          { configuration: component, pageModel: pageModel, preview: preview }, null);
        return (componentEl);
      }
    } else {
      // component not defined in component-definitions
      return (
        <UndefinedComponent name={component.label} />
      );
    }
  }

  render() {
    const configuration = this.props.configuration;
    const pageModel = this.props.pageModel;
    const preview = this.props.preview;

    return (
      <div className="hst-container-item">
        { configuration &&
          this.renderContainerItem(configuration, pageModel, preview)
        }
      </div>
    );
  }
}