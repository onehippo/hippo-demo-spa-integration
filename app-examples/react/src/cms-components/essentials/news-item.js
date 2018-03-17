import React from 'react';
import { Link } from 'react-router-dom'
import { parseDate } from "../../utils/date";

export default class NewsItem extends React.Component {
  render () {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;

    let link;
    if (content._links && content._links.site) {
      if (content._links.type === 'internal') {
        link = <Link to={content._links.site}>{content.title}</Link>
      } else {
        link = <a href={content._links.site}>{content.title}</a>
      }
    }

    return (
      <div className="blog-post has-edit-button">
        { manageContentButton && manageContentButton }
        <h2 className="blog-post-title">
          { link && link }
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