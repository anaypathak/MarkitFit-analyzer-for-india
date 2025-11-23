import express from 'express';
import './utils/dotenv_config.js';
import homeRouter from './routes/home.router.js';
import { rateLimit } from 'express-rate-limit';
import downloadableRouter from './routes/downloadable.js';
import addtionalInfoRouter from './routes/additional.info.js';
import finalOutputRouter from './routes/final-output.js';
const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      message: 'Too many requests from this IP, please try again after 5 minutes',
    });
  },
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(downloadableRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(homeRouter);
app.use(finalOutputRouter);
app.use(addtionalInfoRouter);

app.listen(process.env.PORT, () => {
  console.log(`MarketFit Predictor app running on port ${process.env.PORT}`);
});
