import React from 'react';
import Placeholder from '../core/placeholder';
import ContentComponent from '../core/content-component';

export default class NewsList extends React.Component {
  render() {
    const list = this.props.configuration.attributes.pageable.items;
    const preview = this.props.preview;
    const content = this.props.content;
    let configuration = this.props.configuration;

    // return placeholder if no list is set on component
    if (list.length === 0) {
      return (
        <Placeholder componentType={this.props.configuration.type} />
      );
    }

    // build list of news articles
    const listItems = list.map((listItem, index) => {
      if (configuration && typeof configuration === 'object' && configuration.constructor === Object) {
        // change type as we want to render the NewsItem component
        configuration.type = 'News Item';
      } else {
        console.log('NewsList component configuration is not a map, unexpected format of configuration');
      }
      return (
        <ContentComponent configuration={configuration} content={content} preview={preview} documentId={listItem} key={index} />
      );
    });

    return (
      <div className="row">
        <div className="col-sm-12 news-list">
          {listItems}
        </div>
        <nav className="blog-pagination">
          <a className="btn btn-outline-primary disabled" href="#pagination">Older</a>
          <a className="btn btn-outline-secondary disabled" href="#pagination">Newer</a>
        </nav>
      </div>
    );
  }
}