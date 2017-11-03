package com.onehippo.cms7.spa.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.hippoecm.hst.core.request.HstRequestContext;
import org.hippoecm.hst.core.sitemenu.HstSiteMenu;

public class HstSiteMenuRepresentation {

    @XmlElement
    private HstSiteMenu menu;

    @XmlElementWrapper(name = "cmsData")
    private CmsDataRepresentation cmsData;

    public HstSiteMenuRepresentation(HstSiteMenu hstSiteMenu, HstRequestContext requestContext) {
        this.menu = hstSiteMenu;

        // only populate CMS data for preview requests
        if (requestContext.isPreview()) {
            this.cmsData = new CmsDataRepresentation(hstSiteMenu, requestContext);
        }

    }
}
