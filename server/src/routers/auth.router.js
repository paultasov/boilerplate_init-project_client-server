const authRouter = require('express').Router();
const AuthController = require('../controllers/auth.controller');

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/signin', AuthController.signIn);
authRouter.get('/refresh', AuthController.refresh);
authRouter.delete('/signout', AuthController.signOut);

module.exports = authRouter;
