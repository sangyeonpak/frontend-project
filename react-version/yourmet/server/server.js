import postgres from "postgres";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const sql = postgres({database: "yourmet", username: "sangyeonpak", password: "asdf"});
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get("/api/art", (req, res, next) => {
  sql`SELECT * FROM display`.then((result) => {
    // console.log(result);
    res.json(result);
  }).catch(next);
})

app.get("/api/seen", (req, res, next) => {
  sql`SELECT * FROM seen`.then((result) => {
    // console.log(result);
    res.json(result);
  }).catch(next);
})

app.patch("/api/art/:id", (req, res, next) => {
  const {buttonID, image_id, image_url, info_url, name, artist, year} = req.body;
  // console.log(req.body);
  // console.log(image_id);
  sql`UPDATE display SET ${sql(req.body, 'image_id', 'image_url', 'info_url', 'name', 'artist', 'year')} WHERE id=${buttonID}`.then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

app.post("/api/art/", (req, res, next) => {
  sql`INSERT INTO display (image_id, image_url, info_url, name, artist, year) VALUES (null, null, null, null, null, null)`
  .then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

app.post("/api/seen/", (req, res, next) => {
  const {image_id, image_url, info_url, name, artist, year} = req.body;
  sql`INSERT INTO seen (image_id, image_url, info_url, name, artist, year) VALUES (${image_id}, ${image_url}, ${info_url}, ${name}, ${artist}, ${year})`
  .then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

app.delete("/api/seen/:id", (req, res, next) => {
  const {image_id} = req.body;
  console.log(req.body);
  sql`DELETE FROM seen WHERE image_id = ${image_id}`
  .then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(req.body)
})

app.all('*', (req, res) => {
  res.status(404).send("Not found!");
})

app.listen(port, () => {
  console.log("Listening on port ", port);
});