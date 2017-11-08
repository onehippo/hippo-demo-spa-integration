import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { subscribeToUpdateCmsPage } from './client';
import { fetchCmsPage, fetchComponentUpdate } from './common/fetch';
import CmsContainer from './cms-components/container';

class CmsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // fires when a component is updated in the CMS and the sockets server emits 'update' event
    subscribeToUpdateCmsPage(data => {
      // only update when a component changes, when body is empty the user has clicked cancel in component settings
      // refresh in that case to make managing state easier
      if (!data.body) {
        window.location.reload();
      } else {
        // find the component that needs to be updated in the page structure object using its ID
        const componentToUpdate = findChildById(this.state.pageStructure, data.id);
        if (componentToUpdate !== undefined) {
          // fetch updated component from the API
          fetchComponentUpdate(data.url, data.body).then(response => {
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
          console.log('Error! Component with id %s not found', data.id);
        }
      }
    });
  }

  componentDidUpdate () {
    // parse CMS comments for rendering of content & component overlays
    // do this after client-side rendering is finished
    // also, override Hippo Channel Manager functions for handling state changes of components & containers
    hippoJavascriptInitialization();
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
function hippoJavascriptInitialization () {
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

    // prevent CM from replacing markup of component when it updates,
    // for which it normally uses the response of the component rendering request.
    // as we're rendering client-side instead of serverside,
    // the response of the component rendering request cannot be used for this.
    // instead, markup is updated by React app as soon as page structure is updated, see 'subscribeToUpdateCmsPage'
    PageStructureService._updateComponent = function(oldComponent, newMarkup) {
    };

    // similar to '_updateComponent'.
    // since overriding this function causes the state of the containers to get out of sync,
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