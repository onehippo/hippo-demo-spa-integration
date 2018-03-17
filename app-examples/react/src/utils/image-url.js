import { baseUrls } from '../env-vars';

function getImageUrl(image) {
    let imageUrl = null;

    if (image && image._links && image._links.site) {
      imageUrl = baseUrls.cmsBaseUrl + image._links.site;
    }

    return imageUrl;
}

export { getImageUrl };