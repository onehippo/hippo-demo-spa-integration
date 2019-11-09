import { baseUrls } from '../env-vars';
import jsonpointer from 'jsonpointer';

export function getImageUrl(imageObj, pageModel) {
  // get image reference
  let imageUuid;
  if (imageObj && imageObj.$ref) {
    imageUuid = imageObj.$ref
  }

  // Get image model object from either JSONPointer reference ("$ref") or the embedded one itself.
  let image;
  if (imageUuid && (typeof imageUuid === 'string' || imageUuid instanceof String)) {
    image = jsonpointer.get(pageModel, imageUuid);
  } else {
    image = imageObj;
  }

  // build URL
  let imageUrl = null;
  if (image && image._links && image._links.site && image._links.site.href) {
    imageUrl = baseUrls.cmsBaseUrl + image._links.site.href;
  }

  return imageUrl;
}
