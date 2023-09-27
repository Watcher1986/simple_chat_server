import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3500;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:3500', 'http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log('user connected' + socket.id);

  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
