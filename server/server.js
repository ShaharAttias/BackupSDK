const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const connectDB = require("./config/database");
const backupRoutes = require("./routes/backupRoutes");
const appRoutes = require("./routes/appRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BackupFlow API",
      version: "1.0.0",
      description: "API documentation for BackupFlow SDK backend",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", backupRoutes);
app.use("/api", appRoutes);

app.get("/", (req, res) => {
  res.send("BackupFlow Server Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});