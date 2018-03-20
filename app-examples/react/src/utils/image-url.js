import { baseUrls } from '../env-vars';
import jsonpointer from 'jsonpointer';

export function getImageUrl(imageRef, pageModel) {
  // get image reference
  let imageUuid;
  if (imageRef || imageRef.$ref) {
    imageUuid = imageRef.$ref
  }

  // get serialized image via reference
  let image;
  if (imageUuid && (typeof imageUuid === 'string' || imageUuid instanceof String)) {
    image = jsonpointer.get(pageModel, imageUuid);
  }

  // build URL
  let imageUrl = null;
  if (image && image._links && image._links.site && image._links.site.href) {
    imageUrl = baseUrls.cmsBaseUrl + image._links.site.href;
  }

  return imageUrl;
}