import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import mongoose from 'mongoose';
import { createJWTToken } from './helper';
import { initUser1 } from './fixture';

chai.use(chaiHttp);
chai.should()
const jwtToken62 = createJWTToken('620522b4fc13ae03b300031b', 'foo.bar@inseri.swiss')

// TODO verify if endpoint is still needed
describe('GET /users', () => {
  describe('given one user', () => {
    before(async () => {
      await mongoose.connection.dropDatabase()
      await initUser1()
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
        password: "$2b$10$CYjApIE4xeoUQlxq9kh9Q.DKUsRoTLySUp1ylKbV7qn1nWN5jmzoy"
      }])
    })
  })
})

describe('GET /users/:id', () => {
  before(async () => {
    await mongoose.connection.dropDatabase()
    await initUser1()
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
    await initUser1()
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

    it("returns 200", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(200)
    })

    it("returns response object", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.expiresIn.should.deep.equal('3600')
      body.firstName.should.deep.equal('Updated Name')
      body.userId.should.deep.equal('620522b4fc13ae03b300031b')
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

    it("returns 500", async() => {
      const {status} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      status.should.equal(500)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
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

    it("returns 409", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/42086f6cfc13ae209000194c')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(409)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/42086f6cfc13ae209000194c')
                               .auth(jwtToken62, { type: 'bearer' })
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

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
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

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
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

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your last name is invalid!"] })
    })
  })

})

describe('PUT /users/:id/pwd', () => {
  beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    await initUser1()
  })

  describe('given invalid auth token', () => {
    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .send({})
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .send({})
      body.message.should.equal('Auth Failed')
    })
  })

  describe('given valid password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: 'new1234secret',
      oldPwd: 'mysecret1234',
    }

    it("returns 201", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(201)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({message: "Pwd updated"})
    })
  })

  describe('given empty old password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: 'new1234secret',
      oldPwd: '',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your old password input is invalid!"] })
    })
  })

  describe('given empty new password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: '',
      oldPwd: 'mysecret1234',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your new password input is invalid!"] })
    })
  })

  describe('given too short password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: '123',
      oldPwd: 'mysecret1234',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Your new password should contain minimum 4 characters!" })
    })
  })

  describe('given same password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: 'mysecret1234',
      oldPwd: 'mysecret1234',
    }

    it("returns 420", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(420)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Your new password is the same as the old one!" })
    })
  })

  describe('given wrong password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      newPwd: '1234new1234',
      oldPwd: 'wrongpassword',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Your old password input is wrong!" })
    })
  })

  describe('given non-existing userId', () => {
    const payload = {
      userId: '420522b4fc13ae03b300031b',
      newPwd: 'new1234secret',
      oldPwd: 'mysecret1234',
    }

    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/pwd')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Auth failed" })
    })
  })

})
