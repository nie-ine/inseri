import { ObjectId } from "mongodb";
import User from '../src/models/user';
import Action from '../src/models/action';

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

export const initAction1 = async () => {
  const action = {
    _id: new ObjectId('a20522b4fc13ae03b300031b'),
    title: 'my project',
    description: 'super project description',
    type: 'page-set',
    creator: new ObjectId('620522b4fc13ae03b300031b')
  }

  await Action.collection.insertOne(action)
}

export const initAction2 = async () => {
  const action = {
    _id: new ObjectId('b20522b4fc13ae03b300031b'),
    title: 'my proj',
    description: 'magnificent description',
    type: 'page-set',
    creator: new ObjectId('620522b4fc13ae03b300031b')
  }

  await Action.collection.insertOne(action)
}
