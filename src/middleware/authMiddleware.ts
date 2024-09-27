import { Middleware } from '@reduxjs/toolkit';

const authMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const token = storeAPI.getState().user.token;

  if (token) {
    next(action);
  } else {
    console.error('Unauthorized access');
  }
};

export default authMiddleware;
