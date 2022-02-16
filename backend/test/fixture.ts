import { ObjectId } from "mongodb";
import User from '../src/models/user';
import Action from '../src/models/action';
import Query from '../src/models/query';

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
    usrProfileFilePath: null,
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

export const initQuery1 = async () => {
  const query = {
    _id: new ObjectId('a00cc58569210f3c29428faf'),
    path: [],
    title: 'page:my project | data stored in inseri',
    params: [],
    header: [],
    isBoundToPage: 'true',
    creator: new ObjectId('620522b4fc13ae03b300031b'),
    description: '2022:16:10:36:5',
    method: 'JSON',
    serverUrl: 'http://localhost:3000/api/myOwnJson/getJson/a00cc58569210f3c29428faf'
  }

  await Query.collection.insertOne(query)
}

export const initQuery2 = async () => {
  const query = {
    _id: new ObjectId('b00cc58569210f3c29428faf'),
    path: [],
    title: 'page:my proj | data stored in inseri',
    params: [],
    header: [],
    isBoundToPage: 'true',
    creator: new ObjectId('620522b4fc13ae03b300031b'),
    description: '2022:16:10:36:5',
    method: 'JSON',
    serverUrl: 'http://localhost:3000/api/myOwnJson/getJson/b00cc58569210f3c29428faf'
  }

  await Query.collection.insertOne(query)
}
