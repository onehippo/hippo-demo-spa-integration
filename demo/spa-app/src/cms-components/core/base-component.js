import React from 'react';
import { getComponentMetaData } from '../../utils/cms-meta-data';
import ContentComponent from './content-component';
import NewsList from '../essentials/news-list';
import UndefinedComponent from './undefined';

export default class BaseComponent extends React.Component {
  renderComponent(component, content, preview) {
    // based on the type of the component, render a different React component
    switch (component.type) {
      case 'Banner':
      case 'org.onehippo.cms7.essentials.components.EssentialsContentComponent':
        return (
          <ContentComponent configuration={component} content={content} preview={preview} />
        );
      case 'News List':
        return (
          <NewsList configuration={component} content={content} preview={preview} />
        );
      default:
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