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

export const initUser2 = async () => {
  const user = {
    _id: new ObjectId('720522b4fc13ae03b300031b'),
    email: 'foo.bar2@inseri.swiss',
    password: "$2b$10$CYjApIE4xeoUQlxq9kh9Q.DKUsRoTLySUp1ylKbV7qn1nWN5jmzoy",
    firstName: 'Foo',
    lastName: 'Bar',
    newsletter: true,
    usrProfileFilePath: '/home/pic/foo.jpg',
    delete: new Date(2020,1,31)
  }

  await User.collection.insertOne(user)
}
