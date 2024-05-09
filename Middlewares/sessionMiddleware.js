require("dotenv").config();
const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  resave: false,
  saveUninitialized: false,
});

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: "*",
  credentials: true,
};

module.exports = { sessionMiddleware, wrap, corsConfig };
