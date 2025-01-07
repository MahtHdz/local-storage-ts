import { config } from "dotenv";
import { connect, connection } from "mongoose";

const mongoDBConn = () => {
  config();
  const connectionUrl = process.env.DB_URI;
  connect(connectionUrl);
  connection.on("connected", () => {
    console.log("✅ DB is connected");
  });
  connection.on("disconnected", () => {
    console.log(`❌ MongoDB is disconnected to ${connection.name}`);
  });
  connection.on("reconnected", () => {
    console.log(`🔌 MongoDB is reconnected to ${connection.name}`);
  });
  connection.on("error", (error) => {
    console.error("Mongoose default connection error:", error.message);
    process.exit(1);
  });
};

export default mongoDBConn;
