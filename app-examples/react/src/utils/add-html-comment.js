function addBeginComment(htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.beginNodeSpan
    && configuration._meta.beginNodeSpan.data && !htmlElm.classList.contains('cms-begin-comment-added')) {
    htmlElm.insertAdjacentHTML(position, configuration._meta.beginNodeSpan.data);
    // adding an HTML class to ensure comments are not added more than once
    // this is because the comments are added through the DOM and not by React
    // so this function is fired on every re-render of the parent component
    htmlElm.classList.add('cms-begin-comment-added');
  }
}

function addEndComment(htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.endNodeSpan
    && configuration._meta.endNodeSpan.data && !htmlElm.classList.contains('cms-end-comment-added')) {
    htmlElm.insertAdjacentHTML(position, configuration._meta.endNodeSpan.data);
    // see comment in addBeginComment()
    htmlElm.classList.add('cms-end-comment-added');
  }
}

export { addBeginComment, addEndComment };