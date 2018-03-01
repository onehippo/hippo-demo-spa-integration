import React from 'react';
import { getContentMetaData } from '../../utils/cms-meta-data';
import PlaceholderComponent from './placeholder';
import UndefinedComponent from "./undefined";
import {componentDefinitions} from "../../component-definitions";

export default class ContentComponent extends React.Component {
  renderComponent(component, content, contentMetaData, contentMap, preview) {
    // based on the type of the component, render a different React component
    if (component.type in componentDefinitions && componentDefinitions[component.type].component) {
      // component is defined, so render the actual component
      const componentEl = React.createElement(componentDefinitions[component.type].component, {content: content, editContentButton: contentMetaData, contentMap: contentMap, preview: preview}, null);;
      return (componentEl);
    } else {
      // component not defined in component-definitions
      return (
        <UndefinedComponent componentType={component.type} />
      );
    }
  }

  render() {
    const component = this.props.configuration;
    const preview = this.props.preview;
    const contentMap = this.props.content;
    let documentId = null;
    let content = null;
    let contentMetaData = null;

    // return placeholder if no document is set on component
    if (component && component.attributes && component.attributes.document) {
      documentId = component.attributes.document;
    } else if (this.props.documentId) {
      // NewsList component passed document ID through property instead of via reference in attributes map
      documentId = this.props.documentId;
    } else {
      return (
        <PlaceholderComponent componentType={component.type} />
      );
    }

    if (contentMap[documentId] && contentMap[documentId].document) {
      content = contentMap[documentId].document;
    }

    // get content meta-data
    if (preview && documentId && contentMap[documentId]) {
      contentMetaData = getContentMetaData(contentMap[documentId].cmsData);
    }

    return (
      <React.Fragment>
        { this.renderComponent(component, content, contentMetaData, contentMap, preview) }
      </React.Fragment>
    );
  }
}