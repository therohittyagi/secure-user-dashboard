import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp, fetchUsers } from "./authService";

// Define user and token types (adjust based on your actual data models)
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface LoginSuccessResponse {
  token: string;
}

interface RegisterSuccessResponse {
  id: string;
  token: string;
}

interface LoginErrorResponse {
  error: string;
}

interface RegisterErrorResponse {
  error: string;
}

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// Define the state interface
interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  users?: User[]; // For storing fetched users
}

// Initial state
const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  message: "",
};

// Async thunk for signing in
export const loginUser = createAsyncThunk<
  LoginSuccessResponse,
  { email: string; password: string },
  { rejectValue: LoginErrorResponse }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const data = await signIn(email, password); // Should return { token }
    return data; // returning only the token
  } catch (error: any) {
    const message =
      error.response?.data?.error || error.message || "Login failed";
    return thunkAPI.rejectWithValue({ error: message });
  }
});

// Async thunk for signing up
export const registerUser = createAsyncThunk<
  RegisterSuccessResponse,
  { username: string; email: string; password: string },
  { rejectValue: RegisterErrorResponse }
>("user/register", async ({ username, email, password }, thunkAPI) => {
  try {
    const data = await signUp(username, email, password);
    return data;
  } catch (error: any) {
    const message = error.response?.data?.error || "Registration failed";
    return thunkAPI.rejectWithValue({ error: message });
  }
});

// Async thunk for fetching users
export const getUsers = createAsyncThunk<
  UsersResponse,
  void,
  { rejectValue: string }
>("user/getUsers", async (_, thunkAPI) => {
  try {
    const data = await fetchUsers(); // Ensure fetchUsers returns the correct type
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Fetching users failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.message = "Signed out successfully";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginSuccessResponse>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.isError = false;
          state.message = "Login successful";
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.error || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterSuccessResponse>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.isError = false;
          state.message = "Registration successful";
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.error || "Registration failed";
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UsersResponse>) => {
          state.isLoading = false;
          state.users = action.payload.data;
          state.isError = false;
          state.message = "Users fetched successfully";
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === "string"
            ? action.payload
            : "Fetching users failed";
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
