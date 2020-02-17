module.exports.validateRegister = (username, email, password, confirmPassword) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username is empty";
  }
  if (email.trim() === "") {
    errors.email = "Email is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      errors.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password is empty";
  }
  if (password.trim() !== confirmPassword.trim()) {
    errors.confirmPassword = "Password do not match!!!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLogin = ( email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      errors.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password is empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
