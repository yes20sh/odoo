export const isValidEmail = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
};

export const isStrongPassword = (password) => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one symbol
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
  return re.test(password);
};

export const isNonEmptyString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

export const validateUserSignup = ({ name, email, username, password }) => {
  if (!isNonEmptyString(name)) return 'Name is required';
  if (!isNonEmptyString(username)) return 'Username is required';
  if (!isValidEmail(email)) return 'Invalid email format';
  if (!isStrongPassword(password)) return 'Password must be at least 8 characters, with uppercase, lowercase, number, and special character';
  return null; // No errors
};
