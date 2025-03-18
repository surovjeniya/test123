import rateLimit from "express-rate-limit";

export const rateLimiterConfig = rateLimit({
  windowMs: 1000,
  max: 10000,
  message: "Too many requests, please try again later.",
  statusCode: 429,
});
