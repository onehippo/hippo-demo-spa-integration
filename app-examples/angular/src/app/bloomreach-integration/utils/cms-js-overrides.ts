// calls and overrides some of the Angular/JS functions of the Hippo Channel Manager
function cmsJavascriptInitialization (appContext) {
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
        appContext.updateComponent(component, propertiesMap);
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

export { cmsJavascriptInitialization };
