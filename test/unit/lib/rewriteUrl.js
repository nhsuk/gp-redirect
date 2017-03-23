const chai = require('chai');
const rewriteUrl = require('../../../lib/rewriteUrl');

const expect = chai.expect;

const choicesId = 40677;

describe('rewriteUrl', () => {
  it('should transform a GP url into the new GP profiles page', () => {
    const gpReferer = `http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=${choicesId}`;
    const expectedGpProfileUrl = `https://beta.nhs.uk/gp-surgeries/${choicesId}`;

    const rewrittenUrl = rewriteUrl(gpReferer);

    expect(rewrittenUrl).to.be.equal(expectedGpProfileUrl);
  });

  it('should return undefined when the url is not a GP page from choices', () => {
    const nonGpReferer = 'http://www.nhs.uk/Services/hospitals/Overview/DefaultView.aspx?id=2205';

    const result = rewriteUrl(nonGpReferer);

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.undefined;
  });

  it('should return undefined when the url does not contain an id', () => {
    const result = rewriteUrl('http://no.thing.here');

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.undefined;
  });

  it('should return undefined when the url is null', () => {
    const result = rewriteUrl(null);

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.undefined;
  });

  it('should return undefined when the url is blank', () => {
    const result = rewriteUrl('');

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.undefined;
  });
});
