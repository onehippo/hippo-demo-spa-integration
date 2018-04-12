// only change these
const scheme = 'http';
const cmsContextPath = 'site';
const cmsChannelPath = 'spa-hap';
const cmsPreviewPrefix = '_cmsinternal';
const cmsApiPath = 'resourceapi';
const cmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';

// detect the host automatically.
let cmsHostName = '127.0.0.1';
let cmsPort = '9080';
if (typeof window !== 'undefined' && window.location.host !== "localhost:3000") {
  cmsHostName = window.location.hostname;
  cmsPort = window.location.port;
}

// don't change these
const baseUrls = {};
baseUrls.cmsBaseUrl = `${ scheme }://${ cmsHostName }:${ cmsPort }`;
baseUrls.cmsContextPath = cmsContextPath;
baseUrls.cmsChannelPath = cmsChannelPath;
baseUrls.cmsPreviewPrefix = cmsPreviewPrefix;
baseUrls.cmsApiPath = cmsApiPath;
baseUrls.cmsApiComponentRenderingUrlSuffix = cmsApiComponentRenderingUrlSuffix;

export { baseUrls };