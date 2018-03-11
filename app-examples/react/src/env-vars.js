// only change these
const scheme = 'http';
const cmsHostName = 'localhost';
const cmsPort = '8080';
const cmsContextPath = '/site';
const cmsBinariesPath = '/binaries';
const cmsApiPath = '/resourceapi';
const cmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';

// don't change these
const baseUrls = {};
baseUrls.cmsBaseUrl = cmsPort !== '' ? `${ scheme }://${ cmsHostName }:${ cmsPort }` : `${ scheme }://${ cmsHostName }`;
baseUrls.cmsBaseImageUrl = `${ baseUrls.cmsBaseUrl}${ cmsContextPath }${ cmsBinariesPath }`;
baseUrls.cmsApiPath = cmsApiPath;
baseUrls.cmsApiComponentRenderingUrlSuffix = cmsApiComponentRenderingUrlSuffix;

export { baseUrls };