const http = require("http");
const { Server } = require("socket.io");
const { sessionMiddleware,wrap,corsConfig } = require("./Middlewares/sessionMiddleware");
const { authorizeUser } = require("./Middlewares/authorizeUser");

module.exports = function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(wrap(sessionMiddleware));
  io.use(authorizeUser);
  io.on("connect", (socket) => {
    console.log(socket.id);
    console.log(socket.request.session.user.username);
  });

  return io;
};
