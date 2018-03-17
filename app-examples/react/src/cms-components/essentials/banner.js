import React from 'react';

export default class Banner extends React.Component {
  render() {
    const content = this.props.content;
    const manageContentButton = this.props.manageContentButton;

    let image;
    if (content.image && content.image._links && content.image._links.site) {
      image = content.image._links.site;
    }

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