function interpolateIdIfAvailable(url) {
  const choicesId = url.split('id=')[1];
  return choicesId ? `https://beta.nhs.uk/gp-surgeries/${choicesId}` : undefined;
}

function rewriteUrl(url) {
  if (url) {
    if (url.toLowerCase().includes('www.nhs.uk/services/gp/')) {
      return interpolateIdIfAvailable(url);
    }
  }
  return undefined;
}

module.exports = rewriteUrl;
