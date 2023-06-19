import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STR || "");
  } catch (error) {
    console.log("Error trying to connect to DB");
    console.log("Logs: ", error);
  }
};

export default connectDB;
