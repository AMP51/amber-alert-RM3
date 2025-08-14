const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const seedUsers = require('./seeders/seedUsers');


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

(async () => {
  try {
    await connectDB();
    await seedUsers();

    app.listen(port, () => {
      console.log(`Amber Alert server running on port: ${port}`);
    });
  } catch (err) {
    console.error("server failed to start:", err);
  }
})();