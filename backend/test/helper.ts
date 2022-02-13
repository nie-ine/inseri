import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";

const {SALT} = process.env;

export const createJWTToken = (userId: string, email: string) => {
  const payload = {
    email,
    userId: new ObjectId(userId),
  }

  return jwt.sign(payload, SALT, { expiresIn: '1h' })
}
