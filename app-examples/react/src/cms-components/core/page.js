import React from 'react';
import { fetchCmsPage, fetchComponentUpdate } from '../../utils/fetch';
import { cmsJavascriptInitialization } from '../../utils/cms-js-overrides';
import { findChildById } from '../../utils/find-child-by-id';
import CmsContainer from './container';

export default class CmsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateState (component, propertiesMap) {
    // only update when a component changes, when propertiesMap is empty the user has clicked cancel in component settings
    // refresh in that case as an easy workaround
    if (Object.keys(propertiesMap).length === 0) {
      window.location.reload();
    } else {
      if (component && component.metaData && component.metaData.refNS) {
        const componentId = component.metaData.refNS;
        // find the component that needs to be updated in the page structure object using its ID
        const componentToUpdate = findChildById(this.state.pageStructure, componentId);
        if (componentToUpdate !== undefined) {
          // fetch updated component from the API
          fetchComponentUpdate(this.props.pathInfo, this.props.preview, this.props.contextPath, componentId, propertiesMap).then(response => {
            // API can return empty response when component is deleted
            if (response) {
              // API can return either a single component or single container
              if (response.component) {
                componentToUpdate.parent[componentToUpdate.idx] = response.component;
              } else if (response.container) {
                componentToUpdate.parent[componentToUpdate.idx] = response.container;
              }
              // update documents by merging with original documents map
              if (response.documents) {
                let documents = this.state.pageStructure.documents; // eslint-disable-line
                // ignore error on next line, as variable is a reference to a sub-object of pageStructure
                // and will be used when pageStructure is updated/set
                documents = Object.assign(documents, response.documents);
              }
              // update the page structure after the component/container has been updated
              this.setState({
                pageStructure: this.state.pageStructure
              });
            }
          });
        } else {
          console.log('Error! Component with id %s not found', componentId);
        }
      }
    }
  }

  componentDidUpdate () {
    // parse CMS comments for rendering of content & component overlays
    // do this after client-side rendering is finished
    // also, override Hippo Channel Manager functions for handling state changes of components & containers
    cmsJavascriptInitialization(this);
  }

  componentDidMount() {
    fetchCmsPage(this.props.pathInfo, this.props.preview, this.props.contextPath).then(data => {
      this.setState({
        pageStructure: data
      });
    });
  }

  render() {
    const pageStructure = this.state.pageStructure;
    const preview = this.props.preview;

    let containers = null;
    if (pageStructure && pageStructure.containers) {
      const content = pageStructure.documents;
      containers = pageStructure.containers.map(container => {
        return (<CmsContainer configuration={container} content={content} preview={preview} key={container.id}/>);
      });
    }

    return (
      <div>
        { pageStructure &&
        containers
        }
      </div>
    );
  }
}