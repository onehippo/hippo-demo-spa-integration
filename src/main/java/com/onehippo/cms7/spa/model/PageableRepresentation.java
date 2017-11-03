package com.onehippo.cms7.spa.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

import org.hippoecm.hst.content.beans.standard.HippoBean;
import org.hippoecm.hst.core.request.HstRequestContext;
import org.onehippo.cms7.essentials.components.paging.Pageable;

public class PageableRepresentation {

    @XmlElement
    private int pageSize;

    @XmlElement
    private long total;

    @XmlElement
    private List<String> items = new ArrayList<>();

    @XmlElement
    private int currentPage;

    @XmlElement
    private long totalPages;

    public PageableRepresentation(Pageable pageable, HstRequestContext requestContext) {
        this.pageSize = pageable.getPageSize();
        this.total = pageable.getTotal();
        this.items = getPageableItems(pageable, requestContext);
        this.currentPage = pageable.getCurrentPage();
        this.totalPages = pageable.getTotalPages();
    }

    private List<String> getPageableItems(Pageable pageable, HstRequestContext requestContext) {
        List<String> itemsList = new ArrayList<>();
        for (Object document : pageable.getItems()) {
            // only output documents
            if (document instanceof HippoBean) {
                final String id = ((HippoBean) document).getIdentifier();
                itemsList.add(id);
            }
        }

        return itemsList;
    }

    public List<String> getItems() { return items; }

    public void setItems(List<String> items) { this.items = items; }
}
