import axios, { AxiosResponse } from "axios";

// Define environment variable type
const API_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URL not defined in environment variables");
}

const apiConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Define types for the API responses
interface AuthResponse {
  token: string;
}

interface RegisterResponse {
  id: string;  // Consistent type, set as string
  token: string;
}

interface User {
  id: number; 
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface FetchUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}


// Type-safe API call for signIn
export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${API_URL}/login`,
    { email, password },
    apiConfig
  );
  return response.data;
};

// Type-safe API call for signUp
export const signUp = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${API_URL}/register`,
      { username, email, password },
      apiConfig
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

// Type-safe API call for fetchUsers
export const fetchUsers = async (): Promise<FetchUsersResponse> => {
  const response: AxiosResponse<FetchUsersResponse> = await axios.get(
    `${API_URL}/users`,
    apiConfig
  );
  return response.data;
};
