import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { fetchCmsPage, fetchComponentUpdate } from './common/fetch';
import CmsContainer from './cms-components/container';

class CmsPage extends React.Component {
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
          fetchComponentUpdate(this.props.match.params, componentId, propertiesMap).then(response => {
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
                let documents = this.state.pageStructure.documents;
                // ignore error on next line, as variable is a reference to a sub-object of pageStructure
                // and will be used when pageStructure is updated/set
                documents = Object.assign(documents, response.documents); // eslint-disable-line
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
    hippoJavascriptInitialization(this);
  }

  componentDidMount() {
    fetchCmsPage(this.props.match.params).then(data => {
      this.setState({
        pageStructure: data
      });
    });
  }

  render() {
    const pageStructure = this.state.pageStructure;
    const preview = this.props.match.params.preview;

    let containers = null;
    if (pageStructure && pageStructure.containers) {
      const documents = pageStructure.documents;
      containers = pageStructure.containers.map(container => {
        return (<CmsContainer configuration={container} documents={documents} preview={preview} key={container.id}/>);
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

// calls and overrides some of the Angular/JS functions of the Hippo Channel Manager
function hippoJavascriptInitialization (reactContext) {
  if (window && window.parent && window.parent.angular) {
    const injector = window.parent.angular.element(window.parent.document.body).injector();
    const hstCommentsProcessorService = injector.get("hstCommentsProcessorService");
    const ComponentCatalogService = injector.get("ComponentCatalogService");
    const PageStructureService = injector.get("PageStructureService");

    // clean any parsed CMS comments, if there were any in the server-side response
    PageStructureService.clearParsedElements();
    // parse HTML for CMS comments now that client-side rendering has finished
    hstCommentsProcessorService.run(
      document,
      PageStructureService.registerParsedElement.bind(PageStructureService),
    );
    // add content & component links and overlays
    PageStructureService.attachEmbeddedLinks();

    // Override renderComponent() function which normally requests the componentRenderingURL
    // and then updates the markup of the component by calling updateComponent().
    // Instead, pass the component and the updated properties to the React app,
    // so that the SPA can update the state
    PageStructureService.renderComponent = function(componentId, propertiesMap) {
      let component = this.getComponentById(componentId);
      if (component) {
        reactContext.updateState(component, propertiesMap);
      } else {
        this.$log.warn(`Cannot render unknown component '${componentId}'`);
      }
    };

    // Since NOOPing _updateContainer() causes the state of the containers to get out of sync,
    // trigger a reload of the page as an easy workaround,
    // instead of having to rewrite the function for client-side rendering
    PageStructureService._updateContainer = function(oldContainer, newMarkup) {
      this.HippoIframeService.reload();
    };

    // same as '_updateContainer'.
    // original code comes from services/pageStructureService.service.js
    // added line 4 to trigger reload of the page
    ComponentCatalogService.addComponentToContainer = function(component, containerOverlayElement) {
      const container = this.PageStructureService.getContainerByOverlayElement(containerOverlayElement);
      this.PageStructureService.addComponentToContainer(component, container).then((newComponent) => {
        this.HippoIframeService.reload().then(() => {
          this.PageStructureService.showComponentProperties(newComponent);
        });
      }).catch(() => {
          this.FeedbackService.showError('ERROR_ADD_COMPONENT', {
            component: component.label,
          });
        }).finally(() => {
          if (this.OverlayService.toggleOverlayByComponent) {
            this.OverlayService.toggleOverlayByComponent = false;
            this.OverlayService.showComponentsOverlay(false);
          }
        });
    };
  }
}

// returns parent and index of child referenced by ID,
// so that we can easily replace the child
function findChildById(object, id, parent, idx) {
  var result;
  for(var prop in object) {
    if(object.hasOwnProperty(prop)) {
      if(typeof object[prop] === "object") {
        result = findChildById(object[prop], id, object, prop);
        if(typeof result !== "undefined") {
          return result;
        }
      }
      else if(prop  === "id" && object.id === id) {
        return { parent: parent, idx: idx };
      }
    }
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/:contextPath(site)?/:preview(_cmsinternal)?/:pathInfo*" component={CmsPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);