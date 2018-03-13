// only change these
const scheme = 'http';
const cmsHostName = 'localhost';
const cmsPort = '8080';
const cmsContextPath = 'site';
const cmsChannelPath = '';
const cmsPreviewPrefix = '_cmsinternal';
const cmsBinariesPath = 'binaries';
const cmsApiPath = 'resourceapi';
const cmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';

// don't change these
const baseUrls = {};
baseUrls.cmsBaseUrl = `${ scheme }://${ cmsHostName }:${ cmsPort }`;
baseUrls.cmsBaseImageUrl = `${ baseUrls.cmsBaseUrl }/${ cmsContextPath }/${ cmsBinariesPath }`;
baseUrls.cmsContextPath = cmsContextPath;
baseUrls.cmsChannelPath = cmsChannelPath;
baseUrls.cmsPreviewPrefix = cmsPreviewPrefix;
baseUrls.cmsApiPath = cmsApiPath;
baseUrls.cmsApiComponentRenderingUrlSuffix = cmsApiComponentRenderingUrlSuffix;

export { baseUrls };