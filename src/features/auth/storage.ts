import { UserData } from './types';

const USERS_KEY = 'optimal_users';

export const saveUser = (email: string, userData: UserData): void => {
  const users = getUsers();
  users[email] = userData;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = (): Record<string, UserData> => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

export const getUserByEmail = (email: string): UserData | null => {
  const users = getUsers();
  return users[email] || null;
};