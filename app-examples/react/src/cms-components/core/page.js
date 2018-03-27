import React from 'react';
import { fetchCmsPage, fetchComponentUpdate } from '../../utils/fetch';
import { cmsJavascriptInitialization, cmsParseComments } from '../../utils/cms-js-overrides';
import { findChildById } from '../../utils/find-child-by-id';
import { addBodyComments } from '../../utils/add-html-comment';
import Header from '../../header';
import CmsComponent from './component';
import CmsContainer from './container'; // eslint-disable-line

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
        const componentToUpdate = findChildById(this.state.pageModel, componentId);
        if (componentToUpdate !== undefined) {
          // fetch updated component from the API
          fetchComponentUpdate(this.props.pathInfo, this.props.preview, componentId, propertiesMap).then(response => {
            // API can return empty response when component is deleted
            if (response) {
              // API can return either a single component or single container
              if (response.page) {
                console.log(response.page);
                componentToUpdate.parent[componentToUpdate.idx] = response.page;
              }
              // update documents by merging with original documents map
              if (response.content) {
                let content = this.state.pageModel.content; // eslint-disable-line
                // ignore error on next line, as variable is a reference to a sub-object of pageModel
                // and will be used when pageModel is updated/set
                content = Object.assign(content, response.content);
              }
              // update the page structure after the component/container has been updated
              this.setState({
                pageModel: this.state.pageModel
              });
            }
          });
        } else {
          console.log('Error! Component with id %s not found', componentId);
        }
      }
    }
  }

  fetchPageModel() {
    fetchCmsPage(this.props.pathInfo, this.props.preview).then(data => {
      this.setState({
        pageModel: data
      });
      const comments = addBodyComments(this.state.comments, data.page, this.props.preview);
      // comments are only returned if in preview mode
      if (comments) {
        // save comment elements to state, so these can be removed later on if page changes
        this.setState({
          comments: comments
        })
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.pageModel) {
      // parse CMS comments for initial rendering of content & component overlays
      cmsParseComments();
    } else if (this.props.pathInfo !== prevProps.pathInfo) {
      // fetch new API response if URL has changed
      this.fetchPageModel();
    } else if (this.state.pageModel !== prevState.pageModel) {
      // parse CMS comments if state has been updated
      cmsParseComments();
    }
  }

  componentDidMount() {
    // override Hippo Channel Manager functions for handling state changes of components & containers
    cmsJavascriptInitialization(this);
    // fetch page Model for current page
    this.fetchPageModel();
  }

  render() {
    const pageModel = this.state.pageModel;
    const preview = this.props.preview;

    if (!pageModel || !pageModel.page) {
      return null;
    }

    return (
      <React.Fragment>
        <Header pageModel={pageModel} preview={preview} />
        <div className="container marketing">
          <CmsComponent configuration={pageModel.page} pageModel={pageModel} preview={preview} />

          {/*rendering a specific container:*/}
          {/*<CmsContainer path='main/container' pageModel={pageModel} preview={preview} />*/}
        </div>
      </React.Fragment>
    );
  }
}