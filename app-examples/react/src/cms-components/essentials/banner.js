import React from 'react';
import { getImageUrl } from '../../utils/image-url';

export default class Banner extends React.Component {
  render() {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;
    const image = getImageUrl(content.image);

    return (
      <div className="jumbotron has-edit-button">
        { manageContentButton && manageContentButton }
        { content.title &&
          <h1>{content.title}</h1>
        }
        { image &&
          <figure>
            <img src={image} alt={content.title}/>
          </figure>
        }
        { content.content &&
          <p dangerouslySetInnerHTML={{__html: content.content.value}}></p>
        }
        <p><a className="btn btn-primary btn-lg" href="#banner_link">Learn more</a></p>
      </div>
    );
  }
}