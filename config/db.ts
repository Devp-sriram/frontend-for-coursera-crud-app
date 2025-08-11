import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("Please define the DB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URL, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
