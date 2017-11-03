import React from 'react';
import { getComponentMetaData, getContentMetaData } from '../common/cms-meta-data';
import Placeholder from './placeholder';
import {baseUrls} from '../common/env-vars';

export default class Banner extends React.Component {
  render() {
    const preview = this.props.preview;

    // get component meta-data
    let componentMetaData = {};
    if (preview) {
      componentMetaData = getComponentMetaData(this.props.configuration.cmsData);
    }

    // return placeholder if no document is set on component
    const documentId = this.props.configuration.attributes.document;
    let document = null;
    if (!documentId) {
      return (<div>
        <Placeholder componentName={this.props.configuration.name}
                     componentMetaDataStart={componentMetaData.start}
                     componentMetaDataEnd={componentMetaData.end}/>
      </div>);
    } else if (this.props.documents[documentId] && this.props.documents[documentId].document) {
      document = this.props.documents[documentId].document;
    }

    // get content meta-data
    let contentMetaData = null;
    if (preview) {
      contentMetaData = getContentMetaData(this.props.configuration.attributes.document.cmsData);
    }

    let imageUrl = null;
    if (document.image && document.image.handlePath) {
      imageUrl = baseUrls.cmsBaseImageUrl + document.image.handlePath;
    }

    return (
      <div className="hst-container-item">
        {componentMetaData.start}
        <div className="jumbotron has-edit-button">
          {document.title &&
            <h1>{document.title}</h1>
          }
          {contentMetaData}
          {imageUrl &&
            <figure>
              <img src={imageUrl} alt={document.title}/>
            </figure>
          }
          {document.content &&
            <p dangerouslySetInnerHTML={{__html: document.content.value}}></p>
          }
          <p><a className="btn btn-primary btn-lg" href="#banner_link">Learn more</a></p>
        </div>
        {componentMetaData.end}
      </div>
    );
  }
}