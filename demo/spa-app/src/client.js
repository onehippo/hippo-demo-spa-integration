import openSocket from 'socket.io-client';
import {baseUrls} from './common/env-vars';

const socket = openSocket(baseUrls.socketsServerUrl);

// trigger callback when a component is updated in the CMS and the sockets server emits 'update' event
function subscribeToUpdateCmsPage(callback) {
  socket.on('update', pageStructure => callback(pageStructure));
}

export { subscribeToUpdateCmsPage };