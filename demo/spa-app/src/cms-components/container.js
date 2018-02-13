import React from 'react';
import { getComponentMetaData } from '../common/cms-meta-data';
import Banner from './banner';
import Content from './content';
import NewsList from './news-list';
import UndefinedComponent from './undefined';

export default class CmsContainer extends React.Component {
  renderComponent (containerConfig = { components: [] }, documents, preview) {
    // render all of the container-items (components)
    return containerConfig.components.map((component) => {
      // based on the type of the component, render a different React component
      switch(component.type) {
        case 'Banner':
          return (
            <Banner configuration={component} documents={documents} key={component.id} preview={preview}/>
          );
        case 'News List':
          return (
            <NewsList configuration={component} documents={documents} key={component.id} preview={preview}/>
          );
        case 'org.onehippo.cms7.essentials.components.EssentialsContentComponent':
          return (
            <Content configuration={component} documents={documents} key={component.id} preview={preview}/>
          );
        default:
          return (
            <UndefinedComponent configuration={component} key={component.id} preview={preview}/>
          );
      }
    });
  }

  render() {
    const configuration = this.props.configuration;
    const documents = this.props.documents;
    const preview = this.props.preview;

    // get component meta-data
    let componentMetaData = {};
    if (preview && configuration && configuration.cmsData) {
      componentMetaData = getComponentMetaData(configuration.cmsData);
    }

    return (
      <React.Fragment>
        { componentMetaData.start }
        <div className="hst-container">
          { configuration &&
          this.renderComponent(configuration, documents, preview)
          }
        </div>
        { componentMetaData.end }
      </React.Fragment>
    );
  }
}