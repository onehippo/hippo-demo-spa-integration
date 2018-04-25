package com.onehippo.cms7.spa.demo.components;

import org.apache.commons.lang.StringUtils;
import org.hippoecm.hst.component.support.bean.BaseHstComponent;
import org.hippoecm.hst.configuration.channel.ChannelInfo;
import org.hippoecm.hst.configuration.components.HstComponentConfiguration;
import org.hippoecm.hst.configuration.hosting.Mount;
import org.hippoecm.hst.container.RequestContextProvider;
import org.hippoecm.hst.core.component.HstRequest;
import org.hippoecm.hst.core.component.HstResponse;
import org.hippoecm.hst.core.container.ContainerConstants;
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

        final HstRequestContext requestContext = RequestContextProvider.get();
        final SelectFrontendInfo channelInfo = getChannelInfo();
        final String frontend = channelInfo.getFrontend();

        if (StringUtils.isNotBlank(frontend)) {
            final HstComponentConfiguration componentConfig = requestContext.getResolvedSiteMapItem().getHstComponentConfiguration();
            final String renderPath = componentConfig.getParameter(frontend);

            if (StringUtils.isNotBlank(renderPath)) {
                response.setRenderPath(renderPath);
            }
        }
    }

    private <T extends ChannelInfo> T getChannelInfo() {
        final HstRequestContext requestContext = RequestContextProvider.get();
        final Mount curMount = requestContext.getResolvedMount().getMount();

        if (ContainerConstants.PAGE_MODEL_PIPELINE_NAME.equals(curMount.getNamedPipeline())) {
            return curMount.getParent().getChannelInfo();
        }

        return curMount.getChannelInfo();
    }
}
