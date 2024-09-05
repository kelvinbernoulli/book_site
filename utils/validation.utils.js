const isValidEmail = (email) => {
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validateEmail.test(email);
  };
  
  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  };

  module.exports = { isValidEmail, validatePassword }