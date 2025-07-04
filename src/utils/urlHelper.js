// src/utils/urlHelper.js


export function rewriteImageUrl(path) {
    const baseUrl = window.location.hostname === '192.168.1.127'
      ? 'http://192.168.1.127:8000'
      : 'https://www.nearnet.ca/api';
    return `${baseUrl}${path}`;
  }
  