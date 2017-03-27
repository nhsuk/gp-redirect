function interpolateIdIfAvailable(url) {
  const choicesId = url.split('id=')[1];
  let newUrl;

  if (choicesId) {
    const id = choicesId.split('&')[0];
    newUrl = `https://beta.nhs.uk/gp-surgeries/${id}`;
  }
  return choicesId ? newUrl : undefined;
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
