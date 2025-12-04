import express, { Request, Response } from "express";
import path from "path";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import Hikes from "./services/hike-svc";
import hikes from "./routes/hikes";

connect("hikingclub");

const app = express();
const port = process.env.PORT || 3000;

const PUBLIC = path.join(__dirname, "../../proto/public");

app.use(express.json());
app.use(express.static(PUBLIC));

app.use("/auth", auth);
app.use("/api/hikes", authenticateUser, hikes);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

// serve home page only
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(PUBLIC, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
