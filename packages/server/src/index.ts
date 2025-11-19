import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
connect("hikingclub");
import Hikes from "./services/hike-svc";
import hikes from "./routes/hikes";

const app = express();
const port = process.env.PORT || 80;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use(express.json());
app.use("/api/hikes", hikes);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/hikes/:title", (req: Request, res: Response) => {
    Hikes.get(req.params.title).then((data) => {
      if (data) {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(data));
      }
      else {
        res.status(404).send();
      }
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
