package com.onehippo.cms7.spa.demo.components;

import org.hippoecm.hst.component.support.bean.BaseHstComponent;
import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.configuration.hosting.Mount;
import org.hippoecm.hst.core.component.HstRequest;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.parameters.ParametersInfo;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.onehippo.cms7.spa.demo.channels.SelectFrontendInfo;

@ParametersInfo(type = SelectFrontendInfo.class)
public class BaseTemplateComponent extends BaseHstComponent {

    public static final Logger log = LoggerFactory.getLogger(BaseTemplateComponent.class);

    @Override
    public void doBeforeRender(HstRequest request, HstResponse response) {
        super.doBeforeRender(request, response);
        final HstRequestContext ctx = request.getRequestContext();
        final SelectFrontendInfo channelInfo = ctx.getResolvedMount().getMount().getChannelInfo();
        final HstComponentConfiguration componentConfig = ctx.getResolvedSiteMapItem().getHstComponentConfiguration();
        final String frontend = channelInfo.getFrontend();
        final String renderPath = componentConfig.getParameter(frontend);
        if (renderPath != null) {
            response.setRenderPath(renderPath);
        }
    }
}
