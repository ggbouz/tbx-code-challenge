import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { app } from './server.js';

chai.use(chaiHttp);
const expect = chai.expect;

// Test suite for API
describe('API Tests', () => {
  // Test case for the /files/data endpoint
  it('should return file data', (done) => {
    chai
      .request(app)
      .get('/files/data')
      // Send the request
      .end((err, res) => {
        // Check if the response status is 200
        expect(res).to.have.status(200);
        // Check if the response body is an array
        expect(res.body).to.be.an('array');
        // Check if the first element in the array has the 'file' property
        expect(res.body[0]).to.have.property('file');
        // Check if the first element in the array has the 'lines' property
        expect(res.body[0]).to.have.property('lines');
        // Check if 'lines' is an array
        expect(res.body[0].lines).to.be.an('array');
        // Check if the first element in 'lines' has the 'text' property
        expect(res.body[0].lines[0]).to.have.property('text');
        // Check if the first element in 'lines' has the 'number' property
        expect(res.body[0].lines[0]).to.have.property('number');
        // Check if the first element in 'lines' has the 'hex' property
        expect(res.body[0].lines[0]).to.have.property('hex');
        done();
      });
  });
});