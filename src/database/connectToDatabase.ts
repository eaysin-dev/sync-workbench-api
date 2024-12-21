import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

let connectionURL = process.env.DB_CONNECTION_URL || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

connectionURL = connectionURL.replace("<db_username>", DB_USERNAME);
connectionURL = connectionURL.replace("<db_password>", DB_PASSWORD);

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://testuser:password@localhost:27017", {
      dbName: process.env.DB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Reconnect if the connection is lost
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection lost. Attempting reconnection...");
  connectToDatabase();
});

export default connectToDatabase;
