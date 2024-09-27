export const checkValidData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );
  const isPasswordValid =
    /^().{5,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

export const checkValidSignUpData = (username, email, password) => {
  const isUsernameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username);
  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isUsernameValid) return "Username is not valid";
  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid)
    return "Password must be 8+ characters, with a digit, lowercase, and uppercase letter.";

  return null;
};
