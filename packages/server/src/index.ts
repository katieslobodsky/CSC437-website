import express, { Request, Response } from "express";
import path from "path";
import { connect } from "./services/mongo";

connect("hikingclub");

import Hikes from "./services/hike-svc";
import hikes from "./routes/hikes";

const app = express();
const port = process.env.PORT || 3000;

// path to frontend
const DIST = path.join(__dirname, "../../proto/dist");
app.use(express.json());
app.use(express.static(DIST));

// API routes
app.use("/api/hikes", hikes);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/hikes/:title", (req: Request, res: Response) => {
  Hikes.get(req.params.title).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send();
    }
  });
});

// fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(DIST, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
