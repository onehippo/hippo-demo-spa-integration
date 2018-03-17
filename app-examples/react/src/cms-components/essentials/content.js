import React from 'react';
import { parseDate } from '../../utils/date';

export default class Content extends React.Component {
  render() {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;

    let image;
    if (content.image && content.image._links && content.image._links.site) {
      image = content.image._links.site;
    }

    return (
      <div className="blog-post has-edit-button">
        { manageContentButton && manageContentButton }
        <h2 className="blog-post-title">{content.title}</h2>
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
        { image &&
          <figure>
            <img src={image} alt={content.title}/>
          </figure>
        }
        { content.content &&
          <p dangerouslySetInnerHTML={{__html: content.content.content}}></p>
        }
      </div>
    );
  }
}