import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth'; // Use environment variable or default

interface LoginResponse {
  token: string;
  message?: string;
}

interface RegisterResponse {
  message: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * Logs in a user by sending credentials to the backend.
 * @param credentials - The user's email and password.
 * @returns A promise that resolves with the login response (token or error message).
 */
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in user:', error.response?.data || error.message);
    // Return a structured error response that the frontend can understand
    return { token: '', message: error.response?.data?.message || error.message || 'An unknown error occurred during login.' };
  }
};

/**
 * Registers a new user by sending registration data to the backend.
 * @param userData - The user's name, email, and password.
 * @returns A promise that resolves with the registration response (success message or error message).
 */
export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    // Return a structured error response
    return { message: error.response?.data?.message || error.message || 'An unknown error occurred during registration.' };
  }
};

// You can add more API functions here for other authentication-related actions,
// like fetching user profile, logging out, etc.