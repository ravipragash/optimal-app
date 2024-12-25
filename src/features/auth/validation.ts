import { SignupFormData } from './types';

export const validateSignup = (data: SignupFormData): string | null => {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    return 'All fields are required';
  }

  if (data.password !== data.confirmPassword) {
    return 'Passwords do not match';
  }

  if (data.password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return null;
};