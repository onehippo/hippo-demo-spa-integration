import React from 'react';
import { getComponentMetaData } from '../../utils/cms-meta-data';
import ContentComponent from './content-component';
import UndefinedComponent from './undefined';
import {componentDefinitions} from "../../component-definitions";

export default class BaseComponent extends React.Component {
  renderComponent(component, content, preview) {
    // based on the type of the component, render a different React component
    if (component.type in componentDefinitions) {
      if ("contentComponent" in componentDefinitions[component.type]
        && componentDefinitions[component.type]["contentComponent"]) {
        // wrap component in ContentComponent class
        return (
          <ContentComponent configuration={component} content={content} preview={preview} />
        );
      } else if (componentDefinitions[component.type].component) {
        // component is defined and does not have to be wrapped in ContentComponent, so render the actual component
        const componentEl = React.createElement(componentDefinitions[component.type].component, {configuration: component, content: content, preview: preview}, null);
        return (componentEl);
      }
    } else {
      // component not defined in component-definitions
      return (
        <UndefinedComponent componentType={component.type} />
      );
    }
  }

  render() {
    const configuration = this.props.configuration;
    const content = this.props.content;
    const preview = this.props.preview;
    let componentMetaData = {};

    // get component meta-data
    if (preview && configuration && configuration.cmsData) {
      componentMetaData = getComponentMetaData(configuration.cmsData);
    }

    return (
      <div className="hst-container-item">
        { componentMetaData.start }
        { configuration &&
          this.renderComponent(configuration, content, preview)
        }
        { componentMetaData.end }
      </div>
    );
  }
}