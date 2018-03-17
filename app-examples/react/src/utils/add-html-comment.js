function addBeginComment(htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.beginNodeSpan
    && configuration._meta.beginNodeSpan.data) {
    htmlElm.insertAdjacentHTML(position, configuration._meta.beginNodeSpan.data);
  }
}

function addEndComment(htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.endNodeSpan
    && configuration._meta.endNodeSpan.data) {
    htmlElm.insertAdjacentHTML(position, configuration._meta.endNodeSpan.data);
  }
}

export { addBeginComment, addEndComment };