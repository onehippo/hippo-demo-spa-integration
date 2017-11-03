package com.onehippo.cms7.spa.model;

import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.core.component.HstRequest;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.hippoecm.hst.core.sitemenu.HstSiteMenu;

public class HstContainerItemComponentRepresentation {

    private static final List<String> ignoreAttributes = Arrays.asList(
            "cparam",
            "editMode",
            "org.hippoecm.hst.utils.ParameterUtils.parametersInfo"
    );

    @XmlElement
    private String name;

    @XmlElement
    private String id;

    @XmlElement
    private String type;

    @XmlElement
    private String superType;

    @XmlElementWrapper(name = "parameters")
    private Map<String, String> parameters;

    @XmlElementWrapper(name = "attributes")
    private Map<String, Object> attributes;

    @XmlElementWrapper(name = "cmsData")
    private CmsDataRepresentation cmsData;

    public HstContainerItemComponentRepresentation(HstComponentConfiguration hstComponentConfiguration,
                                                   HstRequest hstRequest, HstResponse hstResponse) {
        HstRequestContext requestContext = hstRequest.getRequestContext();
        final String refNs = hstRequest.getReferenceNamespace();

        this.name = hstComponentConfiguration.getName();
        this.id = refNs;
        this.superType = hstComponentConfiguration.getComponentType().toString();

        // use label as component type (should be unique), or componentClassName if no label present
        if (hstComponentConfiguration.getComponentType().equals(HstComponentConfiguration.Type.CONTAINER_ITEM_COMPONENT)) {
            if (hstComponentConfiguration.getLabel() != null) {
                this.type = hstComponentConfiguration.getLabel();
            } else {
                this.type = hstComponentConfiguration.getComponentClassName();
            }
        }

        this.parameters = hstComponentConfiguration.getParameters();
        this.attributes = populateAttributes(refNs + ":", hstRequest, requestContext);

        // only populate CMS data for preview requests
        if (requestContext.isPreview()) {
            this.cmsData = new CmsDataRepresentation(hstComponentConfiguration, requestContext, refNs, hstResponse);
        }
    }

    private Map<String, Object> populateAttributes(String componentReferenceNamespace, HstRequest hstRequest,
                                                   HstRequestContext requestContext) {
        HashMap<String, Object> attributeMap = new HashMap<>();
        Enumeration<String> attributesEnum = hstRequest.getAttributeNames();
        while (attributesEnum.hasMoreElements()) {
            final String attributeName = attributesEnum.nextElement();
            // only populate attributes that are set by the component: namespaced with the refNS
            if (attributeName.startsWith(componentReferenceNamespace)) {
                final String trimmedAttributeName = attributeName.substring(componentReferenceNamespace.length());
                Object attributeObject = hstRequest.getAttribute(attributeName);
                // for site menus, use the site menu representation
                if (attributeObject instanceof HstSiteMenu) {
                    final HstSiteMenuRepresentation siteMenu = new HstSiteMenuRepresentation((HstSiteMenu) attributeObject, requestContext);
                    attributeMap.put(trimmedAttributeName, siteMenu);
                // ignore certain attributes that are not relevant to expose over the API
                } else if (!ignoreAttributes.contains(trimmedAttributeName)) {
                    attributeMap.put(trimmedAttributeName, attributeObject);
                }
            }
        }

        return attributeMap;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) { this.attributes = attributes; }

}