import React from 'react';
import { getComponentMetaData, getContentMetaData } from '../common/cms-meta-data';
import Placeholder from './placeholder';
import { parseDate } from "../common/date";

export default class NewsList extends React.Component {

  render() {
    const preview = this.props.preview;
    const list = this.props.configuration.attributes.pageable.items;

    // get component meta-data
    let componentMetaData = {};
    if (preview) {
      componentMetaData = getComponentMetaData(this.props.configuration.cmsData);
    }

    // return placeholder if no list is set on component
    if (list.length === 0) {
      return (<div>
        <Placeholder componentName={this.props.configuration.name}
                     componentMetaDataStart={componentMetaData.start}
                     componentMetaDataEnd={componentMetaData.end}/>
      </div>);
    }

    // build list of news articles
    const listItems = list.map((listItem, index) => {
        const documentId = listItem;
        const document = this.props.documents[documentId].document;
        const link = this.props.documents[documentId].link;

        // get content meta-data
        let contentMetaData = null;
        if (preview) {
          contentMetaData = getContentMetaData(this.props.documents[documentId].cmsData);
        }

        return (
          <div className="blog-post has-edit-button" key={index}>
            {contentMetaData}
            <h2 className="blog-post-title">
              <a href={link}>{document.title}</a>
            </h2>
            <p className="blog-post-meta">
              {document.date &&
              <span className="blog-post-date">{parseDate(document.date)}</span>
              }
              {document.author &&
              <span className="author"><a href="#pagination">{document.author}</a></span>
              }
            </p>
            {document.introduction &&
            <p>{document.introduction}</p>
            }
          </div>
        );
      }
    );

    return (
      <div className="row hst-container-item">
        {componentMetaData.start}
        <div className="col-sm-12 news-list">
          {listItems}
        </div>
        <nav className="blog-pagination">
          <a className="btn btn-outline-primary" href="#pagination">Older</a>
          <a className="btn btn-outline-secondary disabled" href="#pagination">Newer</a>
        </nav>
        {componentMetaData.end}
      </div>
    );
  }
}