const mongoose = require('mongoose');


// Connect to the database
async function connectToDatabase(URI) {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}


// Start DB
async function startDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) await connectToDatabase(MONGODB_URI);
  else console.error("MongoDB URI is not defined.");
}


module.exports = startDB;


