// only change these
const cmsBaseUrl = 'http://localhost:8080';
const cmsContextPath = '/site';
const cmsBinariesPath = '/binaries';
const cmsApiPath = '/resourceapi'
const socketsServer = {
  hostname: 'localhost',
  port: '3123'
}

// don't change these
const baseUrls = {
  cmsBaseUrl: cmsBaseUrl,
  cmsBaseImageUrl: cmsBaseUrl + cmsContextPath + cmsBinariesPath,
  cmsApiPath: cmsApiPath,
  socketsServer: socketsServer,
  socketsServerUrl: 'http://' + socketsServer.hostname + ':' + socketsServer.port
};

// use module.exports instead of export so this module can be imported by nodeJs server (server.js) which doesn't
// support typescript
module.exports.baseUrls = baseUrls;