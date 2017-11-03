import React from 'react';

export default class Placeholder extends React.Component {
  // placeholder component is used for when components data is not set
  // this is the case when a new component is added to a container
  render() {
    const componentName = this.props.componentName;
    const componentMetaDataStart = this.props.componentMetaDataStart;
    const componentMetaDataEnd = this.props.componentMetaDataEnd;

    return (
      <div className="hst-container-item">
        {componentMetaDataStart}
        <div className="placeholder-component">
          Click to add {componentName}
        </div>
        {componentMetaDataEnd}
      </div>
    );
  }
}