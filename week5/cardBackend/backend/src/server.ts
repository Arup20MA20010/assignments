import express, { Response, Request } from "express";
import mongoose from "mongoose";
import { Card } from "./models.js";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*", credentials: true }));
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb+srv://baralarup1430:arup@cluster0.crsnkbb.mongodb.net/")
  .then((res) => {
    console.log("Connected to DB", res.connection.host);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    app.on("error", (err) => console.log(err));
  })
  .catch((err) => console.log(err));

app.post("/api/addCards", async (req: Request, res: Response) => {
  try {
    const { name, description, interest, socials } = req.body;
    const card = await Card.create({ name, description, interest, socials });
    res.json(card);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/showCards", async (_: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/deleteCard", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      res.json({ status: 400, message: "Card not found" });
    }
    const find_card = await Card.findById(id);
    if (find_card) {
      res.json({ status: 400, message: "Card not deleted" });
    }
    res.json({ status: 200, card });
  } catch (err) {
    console.log(err);
  }
});
