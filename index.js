import express from "express"; //check wjay
import colors from "colors"; //this for me senang nak check apa problem kat terminal. each of them kena assign using 'bg{color}.(color)' 
// nak sng ingat 'bg{color}.(color)'  = the line box color.fontcolor
import dotenv from "dotenv";
import morgan from "morgan";
//this important on connect to mongodb, tlg since kat dlm db. kite buat 'try catch' on where berjaya ambik data ke x
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoute.js";


//configuration env
dotenv.config();

//database config
connectDB();

//REST Object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan(`dev`));

//routes
app.use("/api/v1/auth", authRoutes);

//REST API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Fakeshop!</h1>");
});

//Port Note that mu blh pakai mne port but sng pakai default ja. This summon port ot env
const PORT = process.env.PORT || 3000;

//run listen
app.listen(PORT, () => {
  // This utk check port bile u run npm run server and the info ambik kat env
  console.log(
    `Server Running ${process.env.DEV_MODE}mode on port ${PORT}`.bgCyan.white
  );
});
