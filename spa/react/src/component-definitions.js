import Banner from './cms-components/essentials/banner';
import Content from './cms-components/essentials/content';
import NewsList from './cms-components/essentials/news-list';
import NewsItem from './cms-components/essentials/news-item';

const componentDefinitions = {
  "Banner": { component: Banner, contentComponent: true },
  "Content": { component: Content, contentComponent: true },
  "News List": { component: NewsList },
  "News Item": { component: NewsItem, contentComponent: true }
}

export { componentDefinitions };