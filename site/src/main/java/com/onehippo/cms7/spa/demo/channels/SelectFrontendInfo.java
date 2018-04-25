package com.onehippo.cms7.spa.demo.channels;

import java.util.Map;

import org.hippoecm.hst.configuration.channel.ChannelInfo;
import org.hippoecm.hst.core.parameters.DropDownList;
import org.hippoecm.hst.core.parameters.FieldGroup;
import org.hippoecm.hst.core.parameters.FieldGroupList;
import org.hippoecm.hst.core.parameters.Parameter;

import com.fasterxml.jackson.annotation.JsonIgnore;

@FieldGroupList({
        @FieldGroup(
                titleKey = "fields.channel.frontend",
                value = { "frontend" }
        )
})
public interface SelectFrontendInfo extends ChannelInfo {
    @Parameter(name = "frontend", defaultValue = "react")
    @DropDownList(value= {"bloomreach","react","angular"})
    String getFrontend();

    @Override
    @JsonIgnore
    Map<String, Object> getProperties();

}