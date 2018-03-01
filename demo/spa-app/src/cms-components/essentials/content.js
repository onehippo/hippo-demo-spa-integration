import React from 'react';
import { getImageUrl } from '../../utils/image-url';
import { parseDate } from '../../utils/date';

export default class Content extends React.Component {
  render() {
    const content = this.props.componentContent;
    const editContentButton = this.props.editContentButton;
    const imageUrl = getImageUrl( content.image );

    return (
      <div className="blog-post has-edit-button">
        { editContentButton && editContentButton }
        <h2 className="blog-post-title">{content.title}</h2>
        <p className="blog-post-meta">
          {content.date &&
            <span className="blog-post-date">{parseDate(content.date)}</span>
          }
          {content.author &&
            <span className="author"><a href="#pagination">{content.author}</a></span>
          }
        </p>
        {content.introduction &&
          <p>{content.introduction}</p>
        }
        {imageUrl &&
        <figure>
          <img src={imageUrl} alt={content.title}/>
        </figure>
        }
        {content.content &&
        <p dangerouslySetInnerHTML={{__html: content.content.content}}></p>
        }
      </div>
    );
  }
}