import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,                 // limit each IP to 10 requests per window
  message: {
    message: "Too many requests, please try again later."
  },
  statusCode: 429,  
  standardHeaders: true,   // Return rate limit info in headers
  legacyHeaders: false
});
