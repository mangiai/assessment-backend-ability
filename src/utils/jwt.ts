const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "dev-secret";
const EXPIRES = process.env.JWT_EXPIRES || "1d";

function signJwt(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}

module.exports = { signJwt, verifyJwt };
