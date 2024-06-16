import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const APIKEY = process.env.APIKEY;

export const APISECRET = process.env.APISECRET;

export const REDIS_URL = process.env.REDIS_URL;

export const MONGODB_URL = process.env.MONGODB_URL;
