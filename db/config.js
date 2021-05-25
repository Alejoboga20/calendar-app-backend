const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('DB Connected');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { dbConnection };
