const defaultCmsScheme = 'http';
const defaultCmsHostName = 'localhost';
const defaultCmsPort = '8080';
const defaultCmsContextPath = 'site';
const defaultCmsChannelPath = '';
const defaultCmsPreviewPrefix = '_cmsinternal';
const defaultCmsApiPath = 'resourceapi';
const defaultCmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';
const cmsUrls = {};
export default cmsUrls;

export function updateCmsUrls(urls) {
  const cmsScheme = urls.cmsScheme ? urls.cmsScheme : defaultCmsScheme;
  const cmsHostName = urls.cmsHostName ? urls.cmsHostName : defaultCmsHostName;
  const cmsPort = urls.cmsPort ? urls.cmsPort : defaultCmsPort;
  cmsUrls.cmsBaseUrl = `${ cmsScheme }://${ cmsHostName }:${ cmsPort }`;
  cmsUrls.cmsContextPath = urls.cmsContextPath ? urls.cmsContextPath : defaultCmsContextPath;
  cmsUrls.cmsChannelPath = urls.cmsChannelPath ? urls.cmsChannelPath : defaultCmsChannelPath;
  cmsUrls.cmsPreviewPrefix = urls.cmsPreviewPrefix ? urls.cmsPreviewPrefix : defaultCmsPreviewPrefix;
  cmsUrls.cmsApiPath = urls.cmsApiPath ? urls.cmsApiPath : defaultCmsApiPath;
  cmsUrls.cmsApiComponentRenderingUrlSuffix = urls.cmsApiComponentRenderingUrlSuffix ? urls.cmsApiComponentRenderingUrlSuffix : defaultCmsApiComponentRenderingUrlSuffix;

  return cmsUrls;
}

updateCmsUrls({});