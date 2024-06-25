const request = require('supertest');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const doctorModel = require('../models/doctorModel'); // Mock doctorModel as needed
const { postLogin } = require('../controllers/doctorController');
const app = express();

// Mock doctorModel.findOne method for testing
jest.mock('../models/doctorModel', () => ({
  findOne: jest.fn(),
}));

// Mock express session
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.post('/doctorDashboard', postLogin);

describe('postLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    jest.resetModules();
  });

  it('should redirect to doctorDashboard on successful login', async () => {
    const mockDoctor = {
      _id: 'doctorId',
      mail: 'test@example.com',
      password: await bcrypt.hash('password123', 10), // Hash the password
      name: 'John',
      firstname: 'Doe',
    };
    // Mock doctorModel.findOne to return mockDoctor
    doctorModel.findOne.mockResolvedValue(mockDoctor);

    // Mock bcrypt.compare pour retourner true


    const req = {
      body: {
        mail: 'test@example.com',
        password: 'password123',
      },
      session: {},
    };

    const res = {
      redirect: jest.fn(),
    };


    // Appel de postLogin avec les mocks
    await postLogin(req, res);

    // Assertions
    expect(res.redirect).toHaveBeenCalledWith('/doctorDashboard');
    expect(req.session.role).toBe('doctor');
    expect(req.session.user).toBe('doctorId');
    expect(req.session.userName).toBe('John');
    expect(req.session.userFirstname).toBe('Doe');;
  });

  it('should render login page with error on wrong password', async () => {
    const mockDoctor = {
      _id: 'doctorId',
      mail: 'test@example.com',
      password: await bcrypt.hash('password123', 10), // Hash the password
      name: 'John',
      firstname: 'Doe',
    };
    // Mock doctorModel.findOne to return mockDoctor
    doctorModel.findOne.mockResolvedValue(mockDoctor);

    // Mock pour req, res, et res.render
    const req = {
      body: {
        mail: 'test@example.com',
        password: 'wrongpassword',
      },
    };
    const res = {
      render: jest.fn(),
    };

    // Appel de postLogin avec les mocks
    await postLogin(req, res);

    // Assertions
    expect(res.render).toHaveBeenCalledWith('doctorView/doctorConnexion/index.html.twig', {
      error: { password: 'Mauvais mot de passe' },
    });
  });

  // Test lorsque l'utilisateur n'est pas enregistré
  it('should render login page with error on non-existing user', async () => {
    doctorModel.findOne.mockResolvedValue(null); // Mock pour utilisateur non trouvé

    // Mock pour req, res, et res.render
    const req = {
      body: {
        mail: 'nonexistent@example.com',
        password: 'password123',
      },
    };
    const res = {
      render: jest.fn(),
    };

    // Appel de postLogin avec les mocks
    await postLogin(req, res);

    // Assertions
    expect(res.render).toHaveBeenCalledWith('doctorView/doctorConnexion/index.html.twig', {
      error: { mail: "Cet utilisateur n'est pas enregistré" },
    });
  });
});