const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const constants = require('../../config/constants');

const expect = chai.expect;
const SITE_ROOT = constants.SITE_ROOT;

chai.use(chaiHttp);

describe('app', () => {
  const choicesId = 40677;
  const choicesGpPage = `http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=${choicesId}`;
  const redirectedToUrl = `https://beta.nhs.uk/gp-surgeries/${choicesId}`;

  it('should redirect root requests to the SITE_ROOT', (done) => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(res).to.redirect;
      expect(res.redirects[0]).to.have.string(SITE_ROOT);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should redirect to the new gp profile page when referer comes from gp on choices', (done) => {
    chai.request(app)
    .get(SITE_ROOT)
    .set('referer', choicesGpPage)
    .end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(res).to.redirect;
      expect(res).to.redirectTo(redirectedToUrl);
      done();
    });
  });

  it('should display the options page when no referer is available', (done) => {
    chai.request(app)
    .get(SITE_ROOT)
    .end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(res).to.be.html;
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should display debug json when debug param supplied', (done) => {
    chai.request(app)
    .get(SITE_ROOT)
    .set('referer', choicesGpPage)
    .query({ debug: '' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      // eslint-disable-next-line no-unused-expressions
      expect(res).to.be.json;
      // eslint-disable-next-line no-unused-expressions
      expect(res.body.headers).to.not.be.undefined;
      expect(res.body.redirectTo).to.be.equal(redirectedToUrl);
      done();
    });
  });
});
