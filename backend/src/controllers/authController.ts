import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { registerUserService, findUserByEmail } from '../services/authService';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();
const saltRounds = 10; // Number of salt rounds for bcrypt

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user using the service
    const newUser = await registerUserService({ name, email, password: hashedPassword });

    // Generate a JWT token for the newly registered user
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    // Pass the error to the default error handler
    next(error);
  }
};

/**
 * Handles user login.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find the user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    // Pass the error to the default error handler
    next(error);
  }
};