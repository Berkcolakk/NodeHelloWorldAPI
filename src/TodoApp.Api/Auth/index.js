import { Application } from "../../server";
import { UserLogin } from "../../TodoApp.Services/UserService";

Application.post("/Auth/Login", (req, res) => {
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
