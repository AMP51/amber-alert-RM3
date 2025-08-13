const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authRoutes);


app.get("/", (req, res) => {
  res.json({ status: "database is connected (Amber Alert)" });
});


connectDB();


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
