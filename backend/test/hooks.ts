import User from '../src/models/user';
import { ObjectId } from "mongodb";
import { RootHookObject } from 'mocha';
import mongoose from 'mongoose';

export const mochaHooks: RootHookObject = {
    beforeAll: async () => {
      await mongoose.connection.dropDatabase();

      const user = new User({
        _id: new ObjectId('620522b4fc13ae03b300031b'),
        email: 'foo.bar@inseri.swiss',
        password: 'mysecret1234',
        firstName: 'Foo',
        lastName: 'Bar',
        newsletter: false,
        usrProfileFilePath: ''
      });

      await user.save()
    },
}
