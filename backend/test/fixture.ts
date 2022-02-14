import { ObjectId } from "mongodb";
import User from '../src/models/user';

export const initUser1 = async () => {
  const user = {
    _id: new ObjectId('620522b4fc13ae03b300031b'),
    email: 'foo.bar@inseri.swiss',
    password: "$2b$10$CYjApIE4xeoUQlxq9kh9Q.DKUsRoTLySUp1ylKbV7qn1nWN5jmzoy",
    firstName: 'Foo',
    lastName: 'Bar',
    newsletter: false,
    usrProfileFilePath: '/home/pic/foo.jpg'
  }

  await User.collection.insertOne(user)
}
