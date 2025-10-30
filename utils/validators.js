const { body, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('contact')
    .isMobilePhone()
    .withMessage('Please provide a valid contact number'),
  body('role')
    .isIn(['admin', 'donor', 'hospital'])
    .withMessage('Role must be admin, donor, or hospital')
];

// Donor validation rules
const validateDonor = [
  body('bloodType')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood type'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other')
];

// Blood unit validation rules
const validateBloodUnit = [
  body('bloodType')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood type'),
  body('volume')
    .isInt({ min: 200, max: 500 })
    .withMessage('Volume must be between 200 and 500 ml'),
  body('collectionDate')
    .isISO8601()
    .withMessage('Please provide a valid collection date')
];

// Request validation rules
const validateRequest = [
  body('patientDetails.name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Patient name must be between 2 and 50 characters'),
  body('patientDetails.age')
    .isInt({ min: 0, max: 120 })
    .withMessage('Age must be between 0 and 120'),
  body('patientDetails.gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('patientDetails.bloodType')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood type'),
  body('patientDetails.urgency')
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Urgency must be low, medium, high, or critical'),
  body('requiredDate')
    .isISO8601()
    .withMessage('Please provide a valid required date')
];

module.exports = {
  handleValidationErrors,
  validateUser,
  validateDonor,
  validateBloodUnit,
  validateRequest
};
