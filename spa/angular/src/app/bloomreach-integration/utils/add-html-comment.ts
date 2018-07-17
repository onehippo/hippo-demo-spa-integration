import getNestedObject from './nested-object';

export default function addBodyComments(configuration, preview) {
  if (preview) {
    // add new body comments
    const pageMetaData = getNestedObject(configuration, ['_meta', 'endNodeSpan', 0]);
    if (pageMetaData) {
      // remove comments from page meta-data element, if existing
      let pageMetaDataElm = document.getElementById('hst-page-meta-data');
      if (pageMetaDataElm) {
        pageMetaDataElm.innerHTML = '';
      } else {
        // otherwise create page-meta-data element containing page HTML comments
        pageMetaDataElm = document.createElement('div');
        pageMetaDataElm.id = 'hst-page-meta-data';
        pageMetaDataElm.style.display = 'none;';
        document.body.appendChild(pageMetaDataElm);
      }

      for (let i = 0; i < configuration._meta.endNodeSpan.length; i++) {
        pageMetaDataElm.insertAdjacentHTML('beforeend', configuration._meta.endNodeSpan[i].data);
      }
    }
  }
}
