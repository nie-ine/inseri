import { ObjectId } from "mongodb";

export const user1 = {
  _id: new ObjectId('620522b4fc13ae03b300031b'),
  email: 'foo.bar@inseri.swiss',
  password: 'mysecret1234',
  firstName: 'Foo',
  lastName: 'Bar',
  newsletter: false,
  usrProfileFilePath: '/home/pic/foo.jpg'
}
