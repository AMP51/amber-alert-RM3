const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const seedUsers = require('./seeders/seedUsers');
const tipRoutes = require("./routes/tipRoutes");


const app = express();

app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", alertRoutes);
app.use("/", messageRoutes);
app.use("/", chatRoutes);
app.use("/", contactRoutes);
app.use("/", tipRoutes);

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