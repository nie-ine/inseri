import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import User from '../src/models/user';
import mongoose from 'mongoose';
import { createJWTToken } from './helper';
import { user1 } from './fixture';

chai.use(chaiHttp);
chai.should()

// TODO verify if endpoint is still needed
describe('GET /users', () => {
  describe('given one user', () => {
    before(async () => {
      await mongoose.connection.dropDatabase()
      await User.collection.insertOne(user1)
    })

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
  before(async () => {
    await mongoose.connection.dropDatabase()
    await User.collection.insertOne(user1)
  })

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

describe('PUT /users/:id', () => {
  before(async () => {
    await mongoose.connection.dropDatabase()
    await User.collection.insertOne(user1)
  })

  describe('given invalid auth token', () => {
    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .send({})
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .send({})
      body.message.should.equal('Auth Failed')
    })
  })

  describe('given valid user', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      email: 'foo.bar@inseri.swiss',
      firstName: 'Updated Name',
      lastName: 'Bar',
      newsletter: true
    }
    const jwtToken = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

    it("returns 200", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(200)
    })

    it("returns response object", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({
        token: jwtToken,
        expiresIn: '3600',
        firstName: 'Updated Name',
        userId: '620522b4fc13ae03b300031b'
      })
    })
  })

  describe('given nonsense as id', () => {
    const payload = {
      userId: 'nonsense',
      email: 'foo.bar@inseri.swiss',
      firstName: 'Updated Name',
      lastName: 'Bar',
      newsletter: true
    }
    const jwtToken = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

    it("returns 500", async() => {
      const {status} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      status.should.equal(500)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.error.message.should.equal('Cast to ObjectId failed for value "nonsense" (type string) at path "_id" for model "User"')
    })
  })

  describe('given already-taken email', () => {
    const payload = {
      userId: '42086f6cfc13ae209000194c',
      email: 'foo.bar@inseri.swiss',
      firstName: 'Updated Name',
      lastName: 'Bar',
      newsletter: true
    }
    const jwtToken = createJWTToken('42086f6cfc13ae209000194c', 'foo.bar@inseri.swiss')

    it("returns 409", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/42086f6cfc13ae209000194c')
                                 .auth(jwtToken, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(409)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/42086f6cfc13ae209000194c')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "This email address is already taken!" })
    })
  })

  describe('given invalid email', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      email: 'inseri.swiss',
      firstName: 'Updated Name',
      lastName: 'Bar',
      newsletter: true
    }
    const jwtToken = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your email address is invalid!"] })
    })
  })

  describe('given empty firstName', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      email: 'foo.bar@inseri.swiss',
      firstName: '',
      lastName: 'Bar',
      newsletter: true
    }
    const jwtToken = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your first name is invalid!"] })
    })
  })

  describe('given empty lastName', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      email: 'foo.bar@inseri.swiss',
      firstName: 'Foo',
      lastName: '',
      newsletter: true
    }
    const jwtToken = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your last name is invalid!"] })
    })
  })

})
