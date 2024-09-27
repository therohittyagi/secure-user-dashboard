import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const signIn = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

export const fetchUsers = async () => {
  return axios.post(`${API_URL}/users`);
};
