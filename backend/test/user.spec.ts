import server from '../src/server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import mongoose from 'mongoose';
import { createJWTToken } from './helper';
import { initUser1, initUser2 } from './fixture';
import User from '../src/models/user';
import bcrypt from 'bcrypt';


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
  beforeEach(async () => {
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
      email: 'newfoo.bar@inseri.swiss',
      firstName: 'Updated Name',
      lastName: 'Super Bar',
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

    it("updates user", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)

      const {email, firstName, lastName, newsletter} = await User.findById('620522b4fc13ae03b300031b')
      email.should.equal('newfoo.bar@inseri.swiss')
      firstName.should.equal('Updated Name')
      lastName.should.equal('Super Bar')
      newsletter.should.be.true
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

    it("updates password", async() => {
      const response = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/pwd')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)

      const dbUser = await User.findById('620522b4fc13ae03b300031b')
      const isPasswordUpdated = bcrypt.compareSync('new1234secret', dbUser.password)
      isPasswordUpdated.should.be.true
    })
  })

  describe('given nonsense as userId', () => {
    const payload = {
      userId: 'nonsense',
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

})

describe('PUT /users/:id/delete', () => {
  beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    await initUser1()
  })

  describe('given invalid auth token', () => {
    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/delete')
                                 .send({})
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/delete')
                               .send({})
      body.message.should.equal('Auth Failed')
    })
  })

  describe('given correct password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      oldPwd: 'mysecret1234',
    }

    it("returns 201", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/delete')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(201)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/delete')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "User account will be deleted in 30 days" })
    })

    it("sets delete date", async() => {
      const res = await chai.request(server)
                            .put('/api/users/620522b4fc13ae03b300031b/delete')
                            .auth(jwtToken62, { type: 'bearer' })
                            .send(payload)

      const dbUser = await User.findById('620522b4fc13ae03b300031b')
      dbUser.delete.setHours(0,0,0,0)

      const currentDate = new Date()
      currentDate.setHours(0,0,0,0)

      dbUser.delete.should.deep.equal(currentDate)
    })
  })

  describe('given nonsense as userId', () => {
    const payload = {
      userId: 'nonsense',
      oldPwd: 'mysecret1234',
    }

    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/delete')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/delete')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Auth failed" })
    })
  })

  describe('given wrong password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      oldPwd: 'my1234',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/delete')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/delete')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ message: "Your old password input is wrong!" })
    })
  })

  describe('given empty password', () => {
    const payload = {
      userId: '620522b4fc13ae03b300031b',
      oldPwd: '',
    }

    it("returns 400", async() => {
      const {status} = await chai.request(server)
                                 .put('/api/users/620522b4fc13ae03b300031b/delete')
                                 .auth(jwtToken62, { type: 'bearer' })
                                 .send(payload)
      status.should.equal(400)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .put('/api/users/620522b4fc13ae03b300031b/delete')
                               .auth(jwtToken62, { type: 'bearer' })
                               .send(payload)
      body.should.deep.equal({ messages: ["Your old password input is invalid!"] })
    })
  })
})

describe('GET /users/:id/deactivate-newsletter', () => {
  beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    await initUser2()
  })

  describe('given existing user', () => {
    it("returns 201", async() => {
      const {status} = await chai.request(server)
                                 .get('/api/users/720522b4fc13ae03b300031b/deactivate-newsletter')
      status.should.equal(201)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .get('/api/users/720522b4fc13ae03b300031b/deactivate-newsletter')
      body.should.deep.equal({ message: "User does not receive newsletter anymore" })
    })

    it("sets newsletter to false", async() => {
      const res = await chai.request(server)
                            .get('/api/users/720522b4fc13ae03b300031b/deactivate-newsletter')
      const dbUser = await User.findById('720522b4fc13ae03b300031b')
      dbUser.newsletter.should.be.false
    })
  })

  describe('given nonsense as userId', () => {
    it("returns 401", async() => {
      const {status} = await chai.request(server)
                                 .get('/api/users/nonsense/deactivate-newsletter')
      status.should.equal(401)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .get('/api/users/nonsense/deactivate-newsletter')
      body.should.deep.equal({ message: "Did not find user" })
    })
  })

})

describe('GET /users/:email/getUserByEmail', () => {
  before(async () => {
    await mongoose.connection.dropDatabase()
    await initUser1()
  })

  describe('given existing user', () => {
    it("returns 201", async() => {
      const {status} = await chai.request(server)
                                 .get('/api/users/foo.bar@inseri.swiss/getUserByEmail')
      status.should.equal(201)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .get('/api/users/foo.bar@inseri.swiss/getUserByEmail')
      body.message.should.equal("User Successfully found ")
    })

    it("returns user object", async() => {
      const {body} = await chai.request(server)
                               .get('/api/users/foo.bar@inseri.swiss/getUserByEmail')
      body.user.should.deep.equal({
        _id: '620522b4fc13ae03b300031b',
        email: 'foo.bar@inseri.swiss',
        firstName: 'Foo',
        lastName: 'Bar',
        newsletter: false,
        usrProfileFilePath: '/home/pic/foo.jpg'})
    })
  })
})

describe('POST /users/:email/reset-password-set-new-password', () => {
  beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    await initUser1()
  })

  describe('given existing user', () => {
    const payload = {
      temp: "$2b$10$CYjApIE",
      newPwd: "1234new1234"
    }

    it("returns 201", async() => {
      const {status} = await chai.request(server)
                                 .post('/api/users/foo.bar@inseri.swiss/reset-password-set-new-password')
                                 .send(payload)
      status.should.equal(201)
    })

    it("returns message", async() => {
      const {body} = await chai.request(server)
                               .post('/api/users/foo.bar@inseri.swiss/reset-password-set-new-password')
                               .send(payload)
      body.message.should.equal("Pwd updated")
    })


    it("updates password", async() => {
      const response = await chai.request(server)
                                 .post('/api/users/foo.bar@inseri.swiss/reset-password-set-new-password')
                                 .send(payload)

      const dbUser = await User.findById('620522b4fc13ae03b300031b')
      const isPasswordUpdated = bcrypt.compareSync('1234new1234', dbUser.password)
      isPasswordUpdated.should.be.true
    })
  })
})
