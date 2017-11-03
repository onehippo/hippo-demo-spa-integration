package com.onehippo.cms7.spa.model;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElementWrapper;

import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.configuration.components.HstComponentConfigurationService;
import org.hippoecm.hst.configuration.internal.CanonicalInfo;
import org.hippoecm.hst.configuration.sitemenu.HstSiteMenuConfiguration;
import org.hippoecm.hst.content.beans.standard.HippoBean;
import org.hippoecm.hst.content.beans.standard.HippoDocument;
import org.hippoecm.hst.core.channelmanager.ChannelManagerConstants;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.component.HstURL;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.hippoecm.hst.core.sitemenu.HstSiteMenu;

import static org.hippoecm.hst.core.channelmanager.ChannelManagerConstants.HST_LOCKED_BY_CURRENT_USER;
import static org.hippoecm.hst.core.container.ContainerConstants.CMS_REQUEST_USER_ID_ATTR;

import com.onehippo.cms7.spa.utils.HstCmsEditLink;

public class CmsDataRepresentation {

    private static final String EDIT_MENU_LINK = "EDIT_MENU_LINK";
    private static final String CONTENT_LINK = "CONTENT_LINK";

    @XmlElementWrapper(name = "start")
    private Map<String, String> start;

    @XmlElementWrapper(name = "end")
    private Map<String, String> end;

    // populate CMS meta-data for container & component overlays
    public CmsDataRepresentation(HstComponentConfiguration hstComponentConfiguration, HstRequestContext requestContext,
                                 String refNs, HstResponse hstResponse) {
        if (hstComponentConfiguration.getComponentType() == HstComponentConfiguration.Type.CONTAINER_COMPONENT ||
                hstComponentConfiguration.getComponentType() == HstComponentConfiguration.Type.CONTAINER_ITEM_COMPONENT) {
            this.start = populateComponentCmsDataStart(hstComponentConfiguration, requestContext, refNs, hstResponse);
            this.end = populateComponentCmsDataEnd(hstComponentConfiguration);
        }
    }

    // populate CMS meta-data for content overlays
    public CmsDataRepresentation(HippoBean document, HstRequestContext requestContext) {
        if (document != null && document instanceof HippoDocument) {
            HashMap<String, String> cmsDataStartMap = new HashMap<>();
            cmsDataStartMap.put(ChannelManagerConstants.HST_TYPE, CONTENT_LINK);
            cmsDataStartMap.put("uuid", ((HippoDocument) document).getCanonicalHandleUUID());
            cmsDataStartMap.put("url", HstCmsEditLink.getCmsEditLink(document, requestContext));

            this.start = cmsDataStartMap;
        }
    }

    // populate CMS meta-data for menu overlays
    public CmsDataRepresentation(HstSiteMenu siteMenu, HstRequestContext requestContext) {
        HashMap<String, String> cmsDataStartMap = new HashMap<>();
        cmsDataStartMap.put(ChannelManagerConstants.HST_TYPE, EDIT_MENU_LINK);

        // get uuid
        final String siteMenuName = siteMenu.getName();
        final HstSiteMenuConfiguration siteMenuConfiguration = requestContext.getResolvedMount().getMount().
                getHstSite().getSiteMenusConfiguration().getSiteMenuConfiguration(siteMenuName);
        final String uuid = ((CanonicalInfo) siteMenuConfiguration).getCanonicalIdentifier();
        cmsDataStartMap.put("uuid", uuid);

        this.start = cmsDataStartMap;
    }

    private Map<String, String> populateComponentCmsDataStart(HstComponentConfiguration hstComponentConfiguration,
                                                              HstRequestContext requestContext, String refNs,
                                                              HstResponse hstResponse) {
        HashMap<String, String> cmsDataStartMap = new HashMap<>();
        final HstComponentConfigurationService componentConfigurationService = (HstComponentConfigurationService)
                hstComponentConfiguration;
        final String lockedBy = componentConfigurationService.getLockedBy();
        final HstURL componentRenderingURL = hstResponse.createComponentRenderingURL();

        // CMS meta-data should be populated in this exact order
        if (componentConfigurationService.getLockedOn() != null) {
            cmsDataStartMap.put(
                    ChannelManagerConstants.HST_LOCKED_ON,
                    String.valueOf(componentConfigurationService.getLockedOn().getTimeInMillis())
            );
        }
        if (hstComponentConfiguration.getLabel() != null) {
            cmsDataStartMap.put(ChannelManagerConstants.HST_LABEL, hstComponentConfiguration.getLabel());
        }
        if (hstComponentConfiguration.getLastModified() != null) {
            cmsDataStartMap.put(
                    ChannelManagerConstants.HST_LAST_MODIFIED,
                    String.valueOf(hstComponentConfiguration.getLastModified().getTimeInMillis())
            );
        }
        if (hstComponentConfiguration.getXType() != null) {
            cmsDataStartMap.put(ChannelManagerConstants.HST_XTYPE, hstComponentConfiguration.getXType());
        }
        if (hstComponentConfiguration.isInherited()) {
            cmsDataStartMap.put(ChannelManagerConstants.HST_INHERITED, "true");
        }
        if (lockedBy != null) {
            cmsDataStartMap.put(ChannelManagerConstants.HST_LOCKED_BY, componentConfigurationService.getLockedBy());
        }

        cmsDataStartMap.put("uuid", hstComponentConfiguration.getCanonicalIdentifier());
        cmsDataStartMap.put(ChannelManagerConstants.HST_TYPE, hstComponentConfiguration.getComponentType().toString());
        cmsDataStartMap.put("refNS", refNs);
        cmsDataStartMap.put("url", componentRenderingURL.toString());

        if (lockedBy != null && hstComponentConfiguration.getComponentType() == HstComponentConfiguration.Type.CONTAINER_COMPONENT) {
            cmsDataStartMap.put(
                    HST_LOCKED_BY_CURRENT_USER,
                    String.valueOf(lockedBy.equals(getCurrentCmsUser(requestContext)))
            );
        }
        return cmsDataStartMap;
    }

    private Map<String, String> populateComponentCmsDataEnd(HstComponentConfiguration hstComponentConfiguration) {
        HashMap<String, String> cmsDataEndMap = new HashMap<>();
        cmsDataEndMap.put("uuid", hstComponentConfiguration.getCanonicalIdentifier());
        cmsDataEndMap.put("HST-End", "true");

        return cmsDataEndMap;
    }

    private static String getCurrentCmsUser(HstRequestContext hstRequestContext) {
        return (String) hstRequestContext.getServletRequest().getAttribute(CMS_REQUEST_USER_ID_ATTR);
    }
}
