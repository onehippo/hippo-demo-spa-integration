// only change these
const scheme = 'http';
const cmsHostName = '127.0.0.1';
const cmsPort = '9080';
const cmsContextPath = 'site';
const cmsChannelPath = 'spa-hap';
const cmsPreviewPrefix = '_cmsinternal';
const cmsApiPath = 'resourceapi';
const cmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';

// don't change these
const baseUrls = {};
baseUrls.cmsBaseUrl = `${ scheme }://${ cmsHostName }:${ cmsPort }`;
baseUrls.cmsContextPath = cmsContextPath;
baseUrls.cmsChannelPath = cmsChannelPath;
baseUrls.cmsPreviewPrefix = cmsPreviewPrefix;
baseUrls.cmsApiPath = cmsApiPath;
baseUrls.cmsApiComponentRenderingUrlSuffix = cmsApiComponentRenderingUrlSuffix;

export { baseUrls };