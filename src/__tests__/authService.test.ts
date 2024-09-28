import axios from "axios";
import { signIn, signUp, fetchUsers } from "../redux/slices/authService";

jest.mock("axios"); // Mock axios for HTTP requests

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should make a POST request to sign in and return token", async () => {
    const mockTokenResponse = { token: "mockToken" };
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: mockTokenResponse,
    });

    const result = await signIn("test@example.com", "password123");

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/login`,
      { email: "test@example.com", password: "password123" },
      { headers: { "Content-Type": "application/json" } }
    );
    expect(result).toEqual(mockTokenResponse);
  });

  it("should handle login errors properly", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { error: "Invalid credentials" } },
    });

    await expect(signIn("test@example.com", "wrongPassword")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  it("should make a POST request to sign up and return token", async () => {
    const mockRegisterResponse = { id: "1", token: "mockToken" };
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: mockRegisterResponse,
    });

    const result = await signUp("testUser", "test@example.com", "password123");

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/register`,
      {
        username: "testUser",
        email: "test@example.com",
        password: "password123",
      },
      { headers: { "Content-Type": "application/json" } }
    );
    expect(result).toEqual(mockRegisterResponse);
  });

  it("should handle registration errors properly", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { error: "Email already exists" } },
    });

    await expect(
      signUp("testUser", "test@example.com", "password123")
    ).rejects.toThrow("Email already exists");
  });

  it("should make a GET request to fetch users", async () => {
    const mockUsersResponse = { data: [{ id: 1, email: "test@example.com" }] };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsersResponse });

    const result = await fetchUsers();

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users`,
      { headers: { "Content-Type": "application/json" } }
    );
    expect(result).toEqual(mockUsersResponse);
  });

  it("should handle fetch users error properly", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Fetch failed" } },
    });

    await expect(fetchUsers()).rejects.toThrow("Fetch failed");
  });
});
