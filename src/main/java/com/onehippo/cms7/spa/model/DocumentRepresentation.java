package com.onehippo.cms7.spa.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.hippoecm.hst.content.beans.standard.HippoBean;
import org.hippoecm.hst.core.request.HstRequestContext;

public class DocumentRepresentation {

    @XmlElement
    private HippoBean document;

    @XmlElement
    private String link;

    @XmlElementWrapper(name = "cmsData")
    private CmsDataRepresentation cmsData;

    public DocumentRepresentation(HippoBean document, HstRequestContext requestContext) {
        this.document = document;

        final String renderMountAlias = requestContext.getResolvedMount().getMount().getParameter("renderMount");
        String link = requestContext.getHstLinkCreator().
                create(document.getNode(), requestContext, renderMountAlias, "live").
                toUrlForm(requestContext, false);
        // when running locally in dev mode links are suffixed with a query-parameter, remove this
        if (link.indexOf("?org.hippoecm.hst.container.render_host=localhost") != -1) {
            link = link.substring(0, link.indexOf("?org.hippoecm.hst.container.render_host=localhost"));
        }
        this.link = link;
        if (requestContext.isPreview()) {
            this.cmsData = new CmsDataRepresentation(document, requestContext);
        }
    }

    public HippoBean getDocument() { return document; }
}
