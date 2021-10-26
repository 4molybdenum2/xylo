const express = require('express');
const router = express.Router();
const {
  admin,
  redirectToLogin,
  redirectToRegister,
  dashboard,
  error_GET,
  uploadPost,
  register,
  login,
  logout,
  error_POST,
} = require('../controllers/userController.js');

router.get('/admin', admin);

router.get('/login', redirectToLogin).post('/login', login);

router.get('/register', redirectToRegister).post('/register', register);

router.get('/dashboard', dashboard);

router.get('/logout', logout);

router.get('*', error_GET).post('*', error_POST);

router.post('/uploadPost', uploadPost);

module.exports = router;
