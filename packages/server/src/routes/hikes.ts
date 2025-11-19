import express, { Request, Response } from "express";
import { Hike } from "../models/hike";
import Hikes from "../services/hike-svc";

const router = express.Router();

// GET /api/hikes  (all hikes)
router.get("/", (_, res: Response) => {
  Hikes.index()
    .then(list => res.json(list))
    .catch(err => res.status(500).send(err));
});

// GET /api/hikes/:id  (single hike)
router.get("/:id", (req: Request, res: Response) => {
  Hikes.get(req.params.id)
    .then(hike => hike ? res.json(hike) : res.status(404).send("Not found"))
    .catch(err => res.status(500).send(err));
});

// POST /api/hikes (create hike)
router.post("/", (req: Request, res: Response) => {
  Hikes.create(req.body)
    .then(hike => res.status(201).json(hike))
    .catch(err => res.status(500).send(err));
});

// PUT /api/hikes/:id (update hike)
router.put("/:id", (req: Request, res: Response) => {
  Hikes.update(req.params.id, req.body)
    .then(updated => res.json(updated))
    .catch(err => res.status(404).send(err));
});

// DELETE /api/hikes/:id
router.delete("/:id", (req: Request, res: Response) => {
  Hikes.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(404).send(err));
});

export default router;