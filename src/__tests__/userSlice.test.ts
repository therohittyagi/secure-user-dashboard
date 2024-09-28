import { loginUser, registerUser, getUsers } from '../redux/slices/userSlice';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn, signUp, fetchUsers } from '../redux/slices/authService';

jest.mock('../redux/slices/authService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Slice Async Actions', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: null,
      token: null,
      isLoading: false,
      isError: false,
      message: '',
    });
  });

  it('should dispatch loginUser and handle success', async () => {
    const mockResponse = { token: 'mockToken' };
    (signIn as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(loginUser({ email: 'test@example.com', password: 'password123' }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(loginUser.pending.type);
    expect(actions[1].type).toEqual(loginUser.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it('should dispatch registerUser and handle success', async () => {
    const mockResponse = { id: '1', token: 'mockToken' };
    (signUp as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(registerUser({ username: 'testUser', email: 'test@example.com', password: 'password123' }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(registerUser.pending.type);
    expect(actions[1].type).toEqual(registerUser.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });

  it('should dispatch getUsers and handle success', async () => {
    const mockResponse = { data: [{ id: 1, email: 'test@example.com' }] };
    (fetchUsers as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(getUsers());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getUsers.pending.type);
    expect(actions[1].type).toEqual(getUsers.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
  });
});
