import React from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { baseUrls } from '../env-vars';

export function parseAndRewriteLinks (html) {
  return Parser (html, {
    replace: function (domNode) {
      // replace internal links by React Links
      if (domNode.name === 'a' && domNode.attribs && domNode.attribs['data-type'] === 'internal') {
        let linkText;
        if (domNode.children && domNode.children[0] && domNode.children[0].data) {
          linkText = domNode.children[0].data;
        }
        return <Link to={domNode.attribs.href}>{linkText}</Link>;
      } else if (domNode.name === 'img' && domNode.attribs.src) {
        // transform image URLs in fully qualified URLs, so images are also loaded when requested from React app
        // which typically runs on a different port than CMS / HST
        domNode.attribs.src = baseUrls.cmsBaseUrl + domNode.attribs.src;

      }
    }
  });
}