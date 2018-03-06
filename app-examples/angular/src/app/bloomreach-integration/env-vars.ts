// only change these
const scheme = 'http';
const cmsHostName = 'localhost';
const cmsPort = '8080';
const cmsContextPath = '/site';
const cmsBinariesPath = '/binaries';
const cmsApiPath = '/resourceapi';
const cmsApiComponentRenderingUrlSuffix = '?_hn:type=component-rendering&_hn:ref=';


// don't change below this line
export class BaseUrls {
  cmsBaseUrl: string;
  cmsBaseImageUrl: string;
  cmsApiPath: string;
  cmsApiComponentRenderingUrlSuffix: string;
}

export const baseUrls: BaseUrls = {
  cmsBaseUrl: `${ scheme }://${ cmsHostName }:${ cmsPort }`,
  cmsBaseImageUrl: `${ scheme }://${ cmsHostName }:${ cmsPort }${ cmsContextPath }${ cmsBinariesPath }`,
  cmsApiPath: cmsApiPath,
  cmsApiComponentRenderingUrlSuffix: cmsApiComponentRenderingUrlSuffix
};
