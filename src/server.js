import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";

export const app = express();
//sub-routing
const router = express.Router();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

//coustem middleware
const log = (req, res, next) => {
  console.log("logging");
  next(); // this use to call next middleware or controler
};

//to use on everything
//app.use(log);

router.get("/me", (req, res) => {
  res.send({ message: "oh oh" });
});

//telling use /api/me for router
app.use("/api", router);

app.get("/", log, (req, res) => {
  res.send({ message: "hello" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ message: "ok" });
});

app.get("/data", (req, res) => {
  res.send({ data: [1, 2, 3] });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send({ ok: true });
});

export const start = () => {
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
};
