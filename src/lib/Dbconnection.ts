import { promises } from "dns";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function DBconnection(): Promise<void> {
  // fistry check the connection in nextjs
  if (connection.isConnected) {
    console.log("ALready Connected to Database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || " ", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to Database successfully!!!!.....");
  } catch (error) {
    console.error("Failed to connect to the database: ", error);
    process.exit(1);
  }
}

export default DBconnection;
