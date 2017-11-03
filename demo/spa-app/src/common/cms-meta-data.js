import React, { Component } from "react";
import ReactDOM from "react-dom";
import {baseUrls} from '../common/env-vars';

export default class CmsMetaData extends Component {
  componentDidMount() {
    // hacky way create comments in React, which messes up unmounting of the component
    const el = ReactDOM.findDOMNode(this);
    el.outerHTML = this.createComment();
  }

  createComment() {
    let comment = JSON.stringify(this.props.data);
    // replace component rendering URL with hostname and port of sockets server
    // so that socket server can trigger state changes in React app on component updates
    if(comment.indexOf('"url":"/') !== -1) {
      comment = comment.replace('"url":"', '"url":"' + baseUrls.socketsServerUrl);
    }
    return `<!-- ${comment} -->`;
  }

  render() {
    return <div />;
  }
}

// return component CMS meta-data element
function getComponentMetaData(componentMetaData) {
  let start, end = null;
  if (componentMetaData.start) {
    start = <CmsMetaData data={componentMetaData.start}/>;
  }
  if (componentMetaData.end) {
    end = <CmsMetaData data={componentMetaData.end}/>;
  }
  return {
    start: start,
    end: end
  };
}

// return content meta-data element
function getContentMetaData(contentMetaData) {
  let cmsMetaData = null;
  if (contentMetaData) {
    cmsMetaData = <CmsMetaData data={contentMetaData.start}/>;
  }
  return cmsMetaData;
}

export { getComponentMetaData, getContentMetaData };