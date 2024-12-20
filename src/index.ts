import "@/plugins/toJSONPlugin";
import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { connectToDatabase } from "./database";

// env configuration
dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectToDatabase();

    server.listen(port, async () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed");
    console.log("Message:", error);
  }
};

main();
