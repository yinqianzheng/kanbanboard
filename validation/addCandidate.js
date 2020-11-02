const Validator = require("validator");

module.exports = function validateAddCandidateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email) || !Validator.isEmail(data.email)) {
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else {
      errors.email = "Email is invalid";
    }
  }

  if (
    Validator.isEmpty(data.phoneNum) ||
    !Validator.isLength(data.phoneNum, { min: 10, max: 10 })
  ) {
    if (Validator.isEmpty(data.phoneNum)) {
      errors.phoneNum = "Phone number field is required";
    } else {
      errors.phoneNum = "Phone number must be 10 digits";
    }
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Candidate name is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
