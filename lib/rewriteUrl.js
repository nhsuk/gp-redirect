const url = require('url');
const qs = require('querystring');

function interpolateIdIfAvailable(urlToParse) {
  const query = url.parse(urlToParse).query;
  const id = qs.parse(query).id;
  return id ? `https://beta.nhs.uk/gp-surgeries/${id}` : undefined;
}

function rewriteUrl(urlToRewrite) {
  if (urlToRewrite) {
    if (urlToRewrite.toLowerCase().includes('www.nhs.uk/services/gp/')) {
      return interpolateIdIfAvailable(urlToRewrite);
    }
  }
  return undefined;
}

module.exports = rewriteUrl;
