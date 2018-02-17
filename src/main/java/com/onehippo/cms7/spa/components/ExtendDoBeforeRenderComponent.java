package com.onehippo.cms7.spa.components;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.content.beans.standard.HippoBean;
import org.hippoecm.hst.core.component.HstRequest;
import org.hippoecm.hst.core.component.HstRequestImpl;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.onehippo.cms7.essentials.components.paging.Pageable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.onehippo.cms7.genericresource.entitybuilder.GenericResourceEntityBuilder;
import com.onehippo.cms7.spa.model.DocumentRepresentation;
import com.onehippo.cms7.spa.model.HstContainerItemComponentRepresentation;
import com.onehippo.cms7.spa.model.HstContainerRepresentation;
import com.onehippo.cms7.spa.model.PageableRepresentation;

public class ExtendDoBeforeRenderComponent {
    private static Logger log = LoggerFactory.getLogger(ExtendDoBeforeRenderComponent.class);

    public Object execute(ProceedingJoinPoint call) throws Throwable {
        Object[] args = call.getArgs();
        if (args.length < 3) {
            log.warn("Required arguments have not been passed");
            return call.proceed();
        }
        HstRequest hstRequest = (HstRequest) args[1];
        HstResponse hstResponse = (HstResponse) args[2];
        HstRequestContext requestContext = hstRequest.getRequestContext();

        // code invoked before invoking #doBeforeRender()...
        call.proceed();
        // code invoked after invoking #doBeforeRender()...

        if (isGenericResourceEntitySitePipelineRequest(hstRequest)) {
            GenericResourceEntityBuilder builder = GenericResourceEntityBuilder.get(hstRequest.getRequestContext());

            final HstComponentConfiguration componentConfig = (HstComponentConfiguration) ((HstRequestImpl) hstRequest).
                    getComponentWindow().getComponentInfo();

            initializeDocumentsMap(builder);

            // only set certain properties on page-level
            if (componentConfig.getParent() == null && !isComponentRenderingRequest(hstRequest)) {
                builder.setResourceEntity("pageTemplate", componentConfig.getId());
                String pageTitle = hstRequest.getRequestContext().getResolvedSiteMapItem().getHstSiteMapItem().getPageTitle();
                if (pageTitle != null) {
                    builder.setResourceEntity("pageTitle", pageTitle);
                }
                if (componentConfig.getParameters().size() > 0) {
                    builder.setResourceEntity("parameters", componentConfig.getParameters());
                }
            // output containers
            } else if (componentConfig.getComponentType().equals(HstComponentConfiguration.Type.CONTAINER_COMPONENT)) {
                final HstContainerRepresentation container = new HstContainerRepresentation(
                        componentConfig, hstRequest, hstResponse);
                if (!isComponentRenderingRequest(hstRequest)) {
                    builder.addResourceEntity("containers", container);
                } else {
                    builder.setResourceEntity("container", container);
                }
            // output components
            } else if (componentConfig.getComponentType().equals(HstComponentConfiguration.Type.CONTAINER_ITEM_COMPONENT)) {
                final HstContainerItemComponentRepresentation component = new HstContainerItemComponentRepresentation(
                        componentConfig, hstRequest, hstResponse);
                moveDocumentsToDocumentMap(component, requestContext, builder);

                if (!isComponentRenderingRequest(hstRequest)) {
                    addComponentToContainerResourceEntity(hstRequest, component, builder);
                } else {
                    // for component rendering requests, either the container or component only needs to be outputted
                    Object container = builder.getResourceEntity("container");
                    // container is outputted, add component as child
                    if (container != null && container instanceof HstContainerRepresentation) {
                        addComponentToContainer(hstRequest, (HstContainerRepresentation) container, component);
                    // only output component
                    } else {
                        builder.setResourceEntity("component", component);
                    }
                }
            }
        }
        return true;
    }

    private boolean isGenericResourceEntitySitePipelineRequest(HstRequest hstRequest) {
        final String namedPipeline = hstRequest.getRequestContext().getResolvedMount().getNamedPipeline();
        if (namedPipeline != null) {
            return namedPipeline.equals("GenericResourceEntitySitePipeline");
        }
        return false;
    }

    private boolean isComponentRenderingRequest(HstRequest hstRequest) {
        return hstRequest.getRequestContext().getBaseURL().getComponentRenderingWindowReferenceNamespace() != null;
    }

    private Collection<Object> addComponentToContainerResourceEntity(HstRequest hstRequest,
                                                                     HstContainerItemComponentRepresentation component,
                                                                     GenericResourceEntityBuilder builder) {
        final Collection<Object> containers = builder.getCollectionResourceEntity("containers");
        for (Object container : containers) {
            // check if object is a container
            if (container instanceof HstContainerRepresentation) {
                addComponentToContainer(hstRequest, (HstContainerRepresentation) container, component);
            }
        }
        return containers;
    }

    private void addComponentToContainer(HstRequest hstRequest, HstContainerRepresentation container,
                                         HstContainerItemComponentRepresentation component) {
        // get reference namespace of parent
        final String parentRefNs = ((HstRequestImpl) hstRequest).getComponentWindow().getParentWindow().
                getReferenceNamespace();
        // only add to container if reference namespaces match
        if (container.getId().equals(parentRefNs)) {
            container.addComponent(component);
        }
    }

    private void initializeDocumentsMap(GenericResourceEntityBuilder builder) {
        if (builder.getResourceEntity("documents") == null) {
            builder.setResourceEntity("documents", new LinkedHashMap<String, Object>());
        }
    }

    // to prevent circular references, HippoBean objects that have been serialized before are serialized as id only
    // using JSONIdentityInfo annotation of Jackson
    // to make it easier to find the complete hippobean when you only have a reference
    // all hippobeans are removed from the component attributes and put in a documents map
    private void moveDocumentsToDocumentMap(HstContainerItemComponentRepresentation component,
                                           HstRequestContext requestContext,
                                           GenericResourceEntityBuilder builder) {
        // initialize map if it not exists
        Map<String, Object> documents = builder.getMapResourceEntity("documents");
        // loop over component attributes, only these contain references to hippo beans
        Map<String, Object> attributes = component.getAttributes();
        for (Object attributeValue : attributes.values()) {
            if (attributeValue instanceof HippoBean) {
                // replace hippobean in attribute-value by id
                // and store hippobean in documents map
                final DocumentRepresentation documentRepr = new DocumentRepresentation(
                        (HippoBean) attributeValue, requestContext);
                final String id = documentRepr.getDocument().getIdentifier();
                documents.put(id, documentRepr);
                attributeValue = id;
            } else if (attributeValue instanceof Pageable) {
                final List<HippoBean> items = ((Pageable) attributeValue).getItems();
                // put documents in map
                for (HippoBean document : items) {
                    final DocumentRepresentation documentRepr = new DocumentRepresentation(
                            (HippoBean) document, requestContext);
                    final String id = document.getIdentifier();
                    documents.put(id, documentRepr);
                }
                // pageable representation stores ids instead of hippobean references,
                // store representation back on the attribute value
                final PageableRepresentation pageable = new PageableRepresentation(
                        (Pageable) attributeValue, requestContext);
                attributeValue = pageable;
            }
        }

        component.setAttributes(attributes);
    }
}
