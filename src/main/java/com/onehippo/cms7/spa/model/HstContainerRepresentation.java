package com.onehippo.cms7.spa.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.core.component.HstRequest;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.request.HstRequestContext;

public class HstContainerRepresentation {
    @XmlElement
    private String name;

    @XmlElement
    private String id;

    @XmlElement
    private String superType;

    @XmlElement
    private String label;

    @XmlElementWrapper(name = "components")
    private List<HstContainerItemComponentRepresentation> components = new ArrayList<>();

    @XmlElementWrapper(name = "cmsData")
    private CmsDataRepresentation cmsData;

    public HstContainerRepresentation(HstComponentConfiguration hstComponentConfiguration, HstRequest hstRequest,
                                      HstResponse hstResponse) {
        HstRequestContext requestContext = hstRequest.getRequestContext();
        this.name = hstComponentConfiguration.getName();
        final String refNs = hstRequest.getReferenceNamespace();
        this.id = refNs;
        this.label = hstComponentConfiguration.getLabel();
        this.superType = hstComponentConfiguration.getComponentType().toString();

        // only populate CMS data for preview requests
        if (requestContext.isPreview()) {
            this.cmsData = new CmsDataRepresentation(hstComponentConfiguration, requestContext, refNs, hstResponse);
        }
    }

    public String getId() {
        return id;
    }

    public void addComponent(HstContainerItemComponentRepresentation component) {
        this.components.add(component);
    }
}
