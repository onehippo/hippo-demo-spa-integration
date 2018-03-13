import { baseUrls } from '../env-vars';

const requestConfigGet = {
  method: 'GET',
  credentials: 'include'
};

const requestConfigPost = {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

function fetchCmsPage(pathInfo, previewPrefix) {
  const url = buildApiUrl(pathInfo, previewPrefix, null);
  return fetchUrl(url, requestConfigGet);
}

function fetchComponentUpdate(pathInfo, previewPrefix, componentId, body) {
  let requestConfig = requestConfigPost;
  requestConfig.body = toUrlEncodedFormData(body);
  const url = buildApiUrl(pathInfo, previewPrefix, componentId);
  return fetchUrl(url, requestConfigPost);
}

// from rendering.service.js
function toUrlEncodedFormData(json) {
  return Object.keys(json)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
}

function buildApiUrl(pathInfo, previewPrefix, componentId) {
  let url = baseUrls.cmsBaseUrl;
  // add api path to URL, and prefix with contextPath and preview-prefix if used
  if (baseUrls.cmsContextPath !== '') {
    url += '/' + baseUrls.cmsContextPath;
  }
  if (previewPrefix) {
    url += '/' + previewPrefix;
  }
  if (baseUrls.cmsChannelPath  !== '') {
    url += '/' + baseUrls.cmsChannelPath;
  }
  url += '/' + baseUrls.cmsApiPath;
  if (pathInfo) {
    url += '/' + pathInfo;
  }
  // if component ID is supplied, URL should be a component rendering URL
  if (componentId) {
    url += baseUrls.cmsApiComponentRenderingUrlSuffix + componentId;
  }
  return url;
}

function fetchUrl(url, requestConfig) {
  return fetch(url, requestConfig)
    .then(response => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(response.status);
    }).then(response => {
      return response.json();
      // }).then(result => {
      //   console.log(result);
    }).catch(error => {
      console.log('Error while fetching CMS page data for URL:', url);
      console.log(error);
    });
}

export { fetchCmsPage, fetchComponentUpdate };