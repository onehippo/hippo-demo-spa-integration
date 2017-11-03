import React from 'react';
import { getComponentMetaData } from '../common/cms-meta-data';
import Placeholder from './placeholder';

export default class UndefinedComponent extends React.Component {
  // fallback component when unknown/undefined component type is used
  render() {
    const preview = this.props.preview;

    // get component meta-data
    let componentMetaData = {};
    if (preview) {
      componentMetaData = getComponentMetaData(this.props.configuration.cmsData);
    }

    return (
      <Placeholder componentName={this.props.configuration.name}
                   componentMetaDataStart={componentMetaData.start}
                   componentMetaDataEnd={componentMetaData.end}/>
    );
  }
}