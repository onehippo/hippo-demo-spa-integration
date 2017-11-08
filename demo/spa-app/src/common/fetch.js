import { baseUrls } from './env-vars';

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

  return fetchUrl(url, requestConfigGet);
}

function fetchComponentUpdate(url, body) {
  let requestConfig = requestConfigPost;
  requestConfig.body = body;
  return fetchUrl(url, requestConfigPost)
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