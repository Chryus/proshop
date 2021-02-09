import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import supertest from 'supertest';

beforeEach((done) => {
  mongoose.connect(
    process.env.MONGO_TEST_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// @desc    Register a user and get token
// @route   POST /api/users
// @access  Public

test('POST /api/users', async () => {
  const user = await User.create({
    name: 'Jane',
    email: 'jane@jane.com',
    password: 123456
  });

  await supertest(app)
    .post('/api/users/login')
    .send({
      email: 'jane@jane.com',
      password: '123456'
    })
    .expect(200)
    .then((response) => {
      // Check type
      expect(Object(response.body)).toBeTruthy();
      // Check data
      expect(response.body._id).toBe(user.id);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
      expect(response.body.token).toBeTruthy();
    });
});

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public

test('POST /api/users/login', async () => {
  const user = await User.create({
    name: 'Jane',
    email: 'jane@jane.com',
    password: 123456
  });

  await supertest(app)
    .post('/api/users/login')
    .send({
      email: 'jane@jane.com',
      password: '123456'
    })
    .expect(200)
    .then((response) => {
      // Check type
      expect(Object(response.body)).toBeTruthy();
      // Check data
      expect(response.body._id).toBe(user.id);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
      expect(response.body.token).toBeTruthy();
    });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public

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
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(user.id);
      expect(response.body[0].name).toBe(user.name);
      expect(response.body[0].email).toBe(user.email);
    });
});
