import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);


describe('endpoint /users/nonsense', () => {
  it('returns 404', async () => {
    const res = await chai.request(server).get('/users/nonsense')
    chai.expect(res.status).to.eql(404)
  })
})
