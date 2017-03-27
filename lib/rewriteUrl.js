const url = require('url');
const qs = require('querystring');

function ifUrlIsFromGpProfiles(urlToCheck) {
  return urlToCheck && urlToCheck.toLowerCase().includes('www.nhs.uk/services/gp/');
}

function interpolateIdIfAvailable(urlToParse) {
  const query = url.parse(urlToParse).query;
  const id = qs.parse(query).id;
  return id ? `https://beta.nhs.uk/gp-surgeries/${id}` : undefined;
}

function rewriteUrl(urlToRewrite) {
  return ifUrlIsFromGpProfiles(urlToRewrite)
  ? interpolateIdIfAvailable(urlToRewrite)
  : undefined;
}

module.exports = rewriteUrl;
