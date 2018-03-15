import React from 'react';

export default class Banner extends React.Component {
  render() {
    const content = this.props.content;
    const editContentButton = this.props.editContentButton;

    let image;
    if (content.image && content.image._links && content.image._links.self) {
      image = content.image._links.self;
    }

    return (
      <div className="jumbotron has-edit-button">
        { editContentButton && editContentButton }
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