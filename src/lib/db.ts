import { Redis } from "ioredis";

const HOST = "localhost";
const PORT = 6379;

export const sub = new Redis({
  host: HOST,
  port: PORT,
});

export const pub = new Redis({
  host: HOST,
  port: PORT,
});
