import mongoose from 'mongoose' // as usual from import u need to enter command at npm site mongoose morgan 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL); //this summon on the env
    console.log(`Connect to Mongodb ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Unable to link Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;