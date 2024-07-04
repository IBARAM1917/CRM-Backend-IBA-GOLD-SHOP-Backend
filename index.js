const express =require( "express");
const cors =require ("cors");
const dotenv =require ("dotenv");
const connectDB =require ("./Database/config.js");
const authRoute =require('./Routers/authRouter.js')

dotenv.config();

const app = express();



app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Api");
});

app.use("/api/auth",authRoute)

app.listen(process.env.PORT, () => {
  console.log(`server is running on port`);
});
