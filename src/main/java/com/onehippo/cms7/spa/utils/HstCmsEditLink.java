package com.onehippo.cms7.spa.utils;

import java.util.List;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hippoecm.hst.configuration.HstNodeTypes;
import org.hippoecm.hst.configuration.hosting.Mount;
import org.hippoecm.hst.content.beans.standard.HippoBean;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.hippoecm.hst.util.EncodingUtils;
import org.hippoecm.hst.util.HstRequestUtils;
import org.hippoecm.repository.api.HippoNode;
import org.hippoecm.repository.api.HippoNodeType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HstCmsEditLink {
    private final static Logger log = LoggerFactory.getLogger(HstCmsEditLink.class);

    // from org.hippoecm.hst.tag.HstCmsEditLinkTag
    public static String getCmsEditLink(HippoBean hippoBean, HstRequestContext requestContext) {
        HttpServletRequest servletRequest = (HttpServletRequest) requestContext.getServletRequest();

        if(hippoBean == null || hippoBean.getNode() == null || !(hippoBean.getNode() instanceof HippoNode)) {
            String dispatcher = (String)servletRequest.getAttribute("javax.servlet.include.servlet_path");
            if (dispatcher == null) {
                log.info("Cannot create a cms edit url for a bean that is null or has a jcr node that is null or not an instanceof HippoNode");
            } else {
                log.info("Cannot create a cms edit url in template '{}' for a bean that is null or has a jcr node that is null or not an instanceof HippoNode",
                        dispatcher);
            }
            return null;
        }

        if(requestContext == null) {
            log.warn("Cannot create a cms edit url outside the hst request processing for '{}'", hippoBean.getPath());
            return null;
        }

        Mount mount = requestContext.getResolvedMount().getMount();

        // cmsBaseUrl is something like : http://localhost:8080
        // try to find find the best cms location in case multiple ones are configured
        if (mount.getCmsLocations().isEmpty()) {
            log.warn("Skipping cms edit url no cms locations configured in hst hostgroup configuration");
            return null;
        }
        String cmsBaseUrl;
        if (mount.getCmsLocations().size() == 1) {
            cmsBaseUrl = mount.getCmsLocations().get(0);
        } else {
            cmsBaseUrl = getBestCmsLocation(mount.getCmsLocations(), HstRequestUtils.getFarthestRequestHost(servletRequest, false));
        }

        if(cmsBaseUrl.endsWith("/")) {
            cmsBaseUrl = cmsBaseUrl.substring(0, cmsBaseUrl.length() -1);
        }

        HippoNode node = (HippoNode)hippoBean.getNode();
        String nodeLocation;
        String nodeId;
        try {
            Node editNode = node.getCanonicalNode();
            if( editNode == null) {
                log.debug("Cannot create a 'surf and edit' link for a pure virtual jcr node: '{}'", node.getPath());
                return null;
            }  else {
                Node rootNode = editNode.getSession().getRootNode();
                if (editNode.isSame(rootNode)) {
                    log.warn("Cannot create a 'surf and edit' link for a jcr root node.");
                }
                if (editNode.isNodeType(HstNodeTypes.NODETYPE_HST_SITES)) {
                    log.warn("Cannot create a 'surf and edit' link for a jcr node of type '{}'.", HstNodeTypes.NODETYPE_HST_SITES);
                }
                if (editNode.isNodeType(HstNodeTypes.NODETYPE_HST_SITE)) {
                    log.warn("Cannot create a 'surf and edit' link for a jcr node of type '{}'.", HstNodeTypes.NODETYPE_HST_SITE);
                }

                Node handleNode = getHandleNodeIfIsAncestor(editNode, rootNode);
                if(handleNode != null) {
                    // take the handle node as this is the one expected by the cms edit url:
                    editNode = handleNode;
                } else {
                    // do nothing, most likely, editNode is a folder node.
                }
                nodeId = editNode.getIdentifier();
                nodeLocation = editNode.getPath();

            }
        } catch (RepositoryException e) {
            log.error("Exception while trying to retrieve the node path for the edit location", e);
            return null;
        }

        if(nodeLocation == null) {
            log.warn("Did not find a jcr node location for the bean to create a cms edit location with. ");
            return null;
        }

        String encodedPath = EncodingUtils.getEncodedPath(nodeLocation, servletRequest);

        String cmsEditLink = cmsBaseUrl + "?path="+encodedPath;

        return cmsEditLink;
    }

    // from org.hippoecm.hst.tag.HstCmsEditLinkTag
    private static String getBestCmsLocation(final List<String> cmsLocations, final String cmsRequestHostName) {
        for (String cmsLocation : cmsLocations) {
            String hostName = cmsLocation;
            if (cmsLocation.startsWith("http://")) {
                hostName = hostName.substring("http://".length());
            } else if (cmsLocation.startsWith("https://")) {
                hostName = hostName.substring("https://".length());
            }
            hostName = StringUtils.substringBefore(hostName,"/");
            if (cmsRequestHostName.equals(hostName)) {
                return cmsLocation;
            }
        }
        return cmsLocations.get(0);
    }

    // from org.hippoecm.hst.tag.HstCmsEditLinkTag
    private static Node getHandleNodeIfIsAncestor(Node currentNode, Node rootNode) throws RepositoryException{
        if(currentNode.isNodeType(HippoNodeType.NT_HANDLE)) {
            return currentNode;
        }
        if(currentNode.isSame(rootNode)) {
            return null;
        }
        return getHandleNodeIfIsAncestor(currentNode.getParent(), rootNode);
    }
}
