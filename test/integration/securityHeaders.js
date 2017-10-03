const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('security headers', () => {
    it('should be returned for a valid request', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          expect(res).to.have.header('Surrogate-Control', 'no-store');
          expect(res).to.have.header('Pragma', 'no-cache');
          expect(res).to.have.header('Expires', '0');
          expect(res).to.have.header('Content-Security-Policy', 'default-src \'self\'; img-src \'self\' data:; style-src \'unsafe-inline\'');
          expect(res).to.have.header('X-Frame-Options', 'DENY');
          expect(res).to.not.have.header('X-Powered-By');
          expect(res).to.have.header('X-Download-Options', 'noopen');
          expect(res).to.have.header('X-Content-Type-Options', 'nosniff');
          expect(res).to.have.header('Strict-Transport-Security', 'max-age=15552000');
          expect(res).to.have.header('X-Xss-Protection', '1; mode=block');
          done();
        });
    });
  });
});
