import app from '../../server.js';
import dotenv from 'dotenv';
import { connectTestDB } from '../../config/db.js';
import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import supertest from 'supertest';

beforeEach((done) => {
  dotenv.config();
  connectTestDB();
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test('GET /api/users', async () => {
  const user = await User.create({
    name: 'Jane',
    email: 'jane@jane.com',
    password: 123456
  });

  await supertest(app)
    .get('/api/users')
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      // expect(response.body.length).toEqual(1);

      // // Check data
      // expect(response.body[0]._id).toBe(user.id);
      // expect(response.body[0].name).toBe(user.name);
      // expect(response.body[0].email).toBe(user.email);
    });
});
