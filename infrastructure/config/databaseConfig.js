const mongoose = require('mongoose');

const connectDatabase = async (dbURL) => {
  try {
    await mongoose.connect(dbURL, {});
    console.log('Database connected');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = connectDatabase;
