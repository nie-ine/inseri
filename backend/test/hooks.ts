import User from '../src/models/user';
import { ObjectId } from "mongodb";
import { RootHookObject } from 'mocha';

export const mochaHooks: RootHookObject = {
    beforeAll: async () => {
      await User.collection.drop()

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
