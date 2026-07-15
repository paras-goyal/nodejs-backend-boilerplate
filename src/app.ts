import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/health', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default app;