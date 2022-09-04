import { UserLogin } from "../../TodoApp.Services/UserService";
import express from "express";
const Router = express.Router();
//Auth Module.
Router.post("/Login", (req, res) => {
  console.log("test");
  const result = UserLogin(req.body);
  if (result) {
    res.json(result);
    res.statusCode = 200;
  } else {
    res.json({ Error: "Something went wrong." });
    res.statusCode = 200;
  }
  res.json("/Auth/Login");
});

export default Router;
