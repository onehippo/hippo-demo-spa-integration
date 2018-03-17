import React from 'react';
import {parseDate} from "../../utils/date";

export default class NewsItem extends React.Component {
  render () {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;

    let link;
    if (content._links && content._links.site) {
      link = content._links.site;
    }

    return (
      <div className="blog-post has-edit-button">
        { manageContentButton && manageContentButton }
        <h2 className="blog-post-title">
          <a href={link}>{content.title}</a>
        </h2>
        <p className="blog-post-meta">
          { content.date &&
            <span className="blog-post-date">{parseDate(content.date)}</span>
          }
          { content.author &&
            <span className="author"><a href="#pagination">{content.author}</a></span>
          }
        </p>
        { content.introduction &&
          <p>{content.introduction}</p>
        }
      </div>
    );
  }
}