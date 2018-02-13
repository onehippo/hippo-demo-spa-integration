import { baseUrls } from '../env-vars';

function getImageUrl(image) {
    let imageUrl = null;

    if (image && image.handlePath) {
        imageUrl = baseUrls.cmsBaseImageUrl + image.handlePath;
    }

    return imageUrl;
}

export { getImageUrl };