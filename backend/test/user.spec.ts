import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect


describe('endpoint /users', () => {
  it('returns 404', async () => {
    const res = await chai.request(server).get('/api/users/020522b4fc13ae03b30003aa')
    chai.expect(res.status).to.eql(404)
  })

  it('returns 200', async () => {
    const res = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
    expect(res.status).to.eql(200)
  })

  it('returns email', async () => {
    const res = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
    expect(res.body.user.email).to.eql('foo.bar@inseri.swiss')
  })

  it('returns firstName', async () => {
    const res = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
    expect(res.body.user.firstName).to.eql('Foo')
  })

  it('returns lastName', async () => {
    const res = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
    expect(res.body.user.lastName).to.eql('Bar')
  })

  it('returns newsletter', async () => {
    const res = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
    expect(res.body.user.newsletter).to.eql(false)
  })
})
