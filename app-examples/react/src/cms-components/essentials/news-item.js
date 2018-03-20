import React from 'react';
import { Link } from 'react-router-dom'
import { parseDate } from "../../utils/date";

export default class NewsItem extends React.Component {
  renderLink (content) {
    if (content._links && content._links.site && content._links.site.href) {
      if (content._links.site.type === 'internal') {
        return (<Link to={content._links.site.href}>{content.title}</Link>);
      } else {
        return (<a href={content._links.site.href}>{content.title}</a>)
      }
    }
    return null;
  }

  render () {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;

    return (
      <div className="blog-post has-edit-button">
        { manageContentButton && manageContentButton }
        <h2 className="blog-post-title">
          { this.renderLink(content) }
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