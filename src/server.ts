import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';

const PORT = env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📄 API docs available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();