import React from 'react';
import {parseDate} from "../../utils/date";

export default class NewsItem extends React.Component {
  render () {
    const content = this.props.content;
    const contentMap = this.props.contentMap;
    const editContentButton = this.props.editContentButton;

    // link is stored inside the document wrapper, so we need to access it via the content-map
    let link = null;
    if (contentMap[content.id] && contentMap[content.id].link) {
      link = contentMap[content.id].link;
    }

    return (
      <div className="blog-post has-edit-button">
        { editContentButton && editContentButton }
        <h2 className="blog-post-title">
          <a href={link}>{content.title}</a>
        </h2>
        <p className="blog-post-meta">
          {document.date &&
            <span className="blog-post-date">{parseDate(content.date)}</span>
          }
          {document.author &&
            <span className="author"><a href="#pagination">{content.author}</a></span>
          }
        </p>
        {content.introduction &&
          <p>{content.introduction}</p>
        }
      </div>
    );
  }
}