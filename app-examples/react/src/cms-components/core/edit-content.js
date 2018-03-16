import React from 'react';

export default class EditContent extends React.Component {
  addComment(htmlElm, configuration, preview) {
    if (preview && htmlElm && configuration && configuration._meta &&
      configuration._meta.beginNodeSpan && configuration._meta.beginNodeSpan.data) {
      htmlElm.insertAdjacentHTML("afterbegin", configuration._meta.beginNodeSpan.data);
    }
  }

  render() {
    const content = this.props.content;
    const preview = this.props.preview;

    return (
      <div style={{ position: 'relative' }}>
        <span ref={(editContentElm) => { this.addComment(editContentElm, content, preview); }}/>
      </div>
    );
  }
}