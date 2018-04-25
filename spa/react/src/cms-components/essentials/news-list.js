import React from 'react';
import Placeholder from '../core/placeholder';
import ContentComponentWrapper from '../core/content-component-wrapper';

export default class NewsList extends React.Component {
  render() {
    const preview = this.props.preview;
    const pageModel = this.props.pageModel;
    const configuration = this.props.configuration;

    // return placeholder if no list is set on component
    let list = undefined;
    if (configuration && configuration.models && configuration.models.pageable && configuration.models.pageable.items
      && configuration.models.pageable.items.length !== 0) {
      list = configuration.models.pageable.items;
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
        const newsItemConfig = {label: 'News Item'};
        if ('$ref' in listItem) {
          return (
            <ContentComponentWrapper documentUuid={listItem.$ref} configuration={newsItemConfig} pageModel={pageModel}
                                     preview={preview} key={index}/>
          );
        }
      }
      console.log('NewsList component configuration is not a map, unexpected format of configuration');
      return null;
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