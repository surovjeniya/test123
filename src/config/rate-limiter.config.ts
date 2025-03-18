import rateLimit from "express-rate-limit";

export const rateLimiterConfig = rateLimit({
  windowMs: 1000, // 1 секунда
  max: 10000, // максимальное количество запросов за 1 секунду
  message: "Too many requests, please try again later.",
  statusCode: 429, // статус код для превышения лимита
});
