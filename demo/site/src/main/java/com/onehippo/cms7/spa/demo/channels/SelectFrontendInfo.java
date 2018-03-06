package com.onehippo.cms7.spa.demo.channels;

import org.hippoecm.hst.configuration.channel.ChannelInfo;
import org.hippoecm.hst.core.parameters.DropDownList;
import org.hippoecm.hst.core.parameters.FieldGroup;
import org.hippoecm.hst.core.parameters.FieldGroupList;
import org.hippoecm.hst.core.parameters.Parameter;

@FieldGroupList({
        @FieldGroup(
                titleKey = "fields.channel.frontend",
                value = { "frontend" }
        )
})
public interface SelectFrontendInfo extends ChannelInfo {
    @Parameter(name = "frontend", defaultValue = "bloomreach")
    @DropDownList(value= {"bloomreach","react","angular"})
    String getFrontend();
}