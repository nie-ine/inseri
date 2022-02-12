import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
chai.should()

// TODO verify if endpoint is still needed
describe('GET /users', () => {
  describe('given one user', () => {
    it("returns 200", async() => {
      const {status} = await chai.request(server).get('/api/users')
      status.should.equal(200)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server).get('/api/users')
      body.message.should.equal('One pages was found')
    })

    it("returns user object", async() => {
      const {body} = await chai.request(server).get('/api/users')
      body.user.should.deep.equal([{
        __v:0,
        _id: '620522b4fc13ae03b300031b',
        email: 'foo.bar@inseri.swiss',
        firstName: 'Foo',
        lastName: 'Bar',
        newsletter: false,
        usrProfileFilePath: '/home/pic/foo.jpg',
        password: "mysecret1234"
      }])
    })
  })
})

describe('GET /users/:id', () => {
  describe('given non-existing user', () => {
    it("returns 404", async() => {
      const {status} = await chai.request(server).get('/api/users/020522b4fc13ae03b30003aa')
      status.should.equal(404)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server).get('/api/users/020522b4fc13ae03b30003aa')
      body.message.should.equal('User with such an ID was not found!')
    })
  })

  // TODO hide error object
  // TODO return 400
  describe('given nonsense as id', () => {
    it("returns 500", async() => {
      const {status} = await chai.request(server).get('/api/users/nonsense')
      status.should.equal(500)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server).get('/api/users/nonsense')
      body.error.message.should.equal('Cast to ObjectId failed for value "nonsense" (type string) at path "_id" for model "User"')
    })
  })

  describe('given existing user', () => {
    it("returns 200", async() => {
      const {status} = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
      status.should.equal(200)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
      body.message.should.equal('User was found!')
    })

    it("returns user object", async() => {
      const {body} = await chai.request(server).get('/api/users/620522b4fc13ae03b300031b')
      body.user.should.deep.equal({
        userId: '620522b4fc13ae03b300031b',
        email: 'foo.bar@inseri.swiss',
        firstName: 'Foo',
        lastName: 'Bar',
        newsletter: false,
        usrProfileFilePath: '/home/pic/foo.jpg'
      })
    })
  })
})
