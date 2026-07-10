import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js Backend Boilerplate 🚀");
});

export default app;