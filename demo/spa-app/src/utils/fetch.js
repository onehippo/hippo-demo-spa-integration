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

function fetchCmsPage(routerParams) {
  const url = buildApiUrl(routerParams, null);
  return fetchUrl(url, requestConfigGet);
}

function fetchComponentUpdate(routerParams, componentId, body) {
  let requestConfig = requestConfigPost;
  requestConfig.body = toUrlEncodedFormData(body);
  const url = buildApiUrl(routerParams, componentId);
  return fetchUrl(url, requestConfigPost);
}

// from rendering.service.js
function toUrlEncodedFormData(json) {
  return Object.keys(json)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
}

function buildApiUrl(routerParams, componentId) {
  let url = baseUrls.cmsBaseUrl;
  // add api path to URL, and prefix with contextPath and preview-prefix if used
  if (routerParams.contextPath) {
    url += '/' + routerParams.contextPath;
  }
  if (routerParams.preview) {
    url += '/' + routerParams.preview;
  }
  url += baseUrls.cmsApiPath;
  if (routerParams.pathInfo) {
    url += '/' + routerParams.pathInfo;
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