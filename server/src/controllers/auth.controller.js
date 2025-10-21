const AuthService = require('../services/auth.service');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/jwt.config');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = class AuthController {
  static async signUp(req, res) {
    try {
      const user = await AuthService.signUp(req.body);
      const { refreshToken, accessToken } = generateTokens({ user });
      res.status(201).cookie('refreshToken', refreshToken, cookieConfig.refresh).json({ user, accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async signIn(req, res) {
    try {
      const user = await AuthService.signIn(req.body);
      const { refreshToken, accessToken } = generateTokens({ user });
      res.status(201).cookie('refreshToken', refreshToken, cookieConfig.refresh).json({ user, accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const { refreshToken: newRefreshToken, accessToken } = generateTokens({ user });

      res.status(201).cookie('refreshToken', newRefreshToken, cookieConfig.refresh).json({ user, accessToken });
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }

  static async signOut(req, res) {
    try {
      res.clearCookie('refreshToken').sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
};
