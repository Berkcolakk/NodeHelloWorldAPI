const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./Middleware/LogEvent");
const errorHandler = require("./Middleware/ErrorHandler");
const PORT = process.env.PORT || 3500;
const HOST_NAME = process.env.HOST_NAME || "localhost";

//logger is active
app.use(logger);

//CORS Whitelist.
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
//Cors option
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
//Cors option
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//
app.get("/hello", (req, res) => {
  const User = {
    Name: "Berk",
    Username: "Çolak",
  };
  res.json(User);
});

//it works if the request is not going to any endpoint.
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//This will work in any error.
app.use(errorHandler);

//PORT = process.env.PORT
//HOST_NAME = process.env.HOST_NAME
app.listen(PORT, HOST_NAME);
