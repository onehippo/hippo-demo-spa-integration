import React from 'react';
import Placeholder from '../core/placeholder';
import ContentComponent from '../core/content-component';

export default class NewsList extends React.Component {
  render() {
    const preview = this.props.preview;
    const content = this.props.content;
    const configuration = this.props.configuration;

    // return placeholder if no list is set on component
    let list = undefined;
    if (configuration.attributes.pageable && configuration.attributes.pageable.items
      && configuration.attributes.pageable.items.length !== 0) {
      list = configuration.attributes.pageable.items;
    } else if (preview) {
      return (
        <Placeholder componentType={configuration.type} />
      );
    } else {
      // don't render placeholder outside of preview mode
      return null;
    }

    // build list of news articles
    const listItems = list.map((listItem, index) => {
      if (configuration && typeof configuration === 'object' && configuration.constructor === Object) {
        // change type as we want to render the NewsItem component
        const newsItemConfig = { type: 'News Item' };
        return (
          <ContentComponent configuration={newsItemConfig} content={content} preview={preview} documentId={listItem} key={index} />
        );
      } else {
        console.log('NewsList component configuration is not a map, unexpected format of configuration');
        return null;
      }
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