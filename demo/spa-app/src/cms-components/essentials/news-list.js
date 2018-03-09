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
      // check if list is a map
      if (configuration && typeof configuration === 'object' && configuration.constructor === Object) {
        // since we’re wrapping the NewsItem component in the ContentComponent class,
        // we need to pass the type of the component through the component configuration
        const newsItemConfig = { type: 'News Item'};
        // wrap the NewsItem component in ContentComponent class to enable in-context editing
        return (
          <ContentComponent configuration={newsItemConfig} content={content} preview={preview} documentId={listItem} key={index} />
        );
      } else {
        console.log('NewsList component configuration is not a map, unexpected format of configuration');
        return ('Error! NewsList component configuration is not a map, unexpected format of configuration')
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