function addBeginComment (htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.beginNodeSpan
    && configuration._meta.beginNodeSpan.length > 0 && configuration._meta.beginNodeSpan[0].data
    && !htmlElm.classList.contains('cms-begin-comment-added')) {

    htmlElm.insertAdjacentHTML(position, configuration._meta.beginNodeSpan[0].data);
    // adding an HTML class to ensure comments are not added more than once
    // this is because the comments are added through the DOM and not by React
    // so this function is fired on every re-render of the parent component
    htmlElm.classList.add('cms-begin-comment-added');
  }
}

function addEndComment (htmlElm, position, configuration, preview) {
  if (preview && htmlElm && configuration && configuration._meta && configuration._meta.endNodeSpan
    && configuration._meta.endNodeSpan.length > 0 && configuration._meta.endNodeSpan[0].data
    && !htmlElm.classList.contains('cms-end-comment-added')) {

    htmlElm.insertAdjacentHTML(position, configuration._meta.endNodeSpan[0].data);
    // see comment in addBeginComment()
    htmlElm.classList.add('cms-end-comment-added');
  }
}

function addBodyComments (configuration, preview) {
  // add new body comments
  if (preview && configuration && configuration._meta && configuration._meta.endNodeSpan
    && configuration._meta.endNodeSpan.length > 0) {

    // remove comments from page meta-data element, if existing
    let pageMetaDataElm = document.getElementById('hst-page-meta-data');
    if (pageMetaDataElm) {
      pageMetaDataElm.innerHTML = '';
    } else {
      // otherwise create page-meta-data element containing page HTML comments
      pageMetaDataElm = document.createElement('div');
      pageMetaDataElm.id = 'hst-page-meta-data';
      pageMetaDataElm.style = 'display: none;'
      document.body.appendChild(pageMetaDataElm);
    }

    for (let i = 0; i < configuration._meta.endNodeSpan.length; i++) {
      pageMetaDataElm.insertAdjacentHTML('beforeend', configuration._meta.endNodeSpan[i].data);
    }
  }
}

export {addBeginComment, addEndComment, addBodyComments};