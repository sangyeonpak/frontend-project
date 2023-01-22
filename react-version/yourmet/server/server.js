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

app.get("/api/main", (req, res, next) => {
  sql`SELECT * FROM sangyeonpak`.then((result) => {
    // console.log(result);
    res.json(result);
  }).catch(next);
})

// app.patch("/api/items/:item", (req, res, next) => {
//   const {name, location, operator} = req.body;
//   if (location === 'kitchen' && operator === '+'){
//     sql`UPDATE items SET kitchen=kitchen+1 WHERE name=${name} RETURNING *`.then((result) => {
//       res.status(201).json(result[0]);
//     }).catch(next);
//   }

app.patch("/api/art/:id", (req, res, next) => {
  const {buttonID, image_id, image_url, info_url, name, artist, year} = req.body;
  console.log(req.body);
  console.log(image_id);
  sql`UPDATE sangyeonpak SET ${sql(req.body, 'image_id', 'image_url', 'info_url', 'name', 'artist', 'year')} WHERE id=${buttonID}`.then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

app.post("/api/art/", (req, res, next) => {
  sql`INSERT INTO sangyeonpak (image_id, image_url, info_url, name, artist, year) VALUES (null, null, null, null, null, null)`
  .then((result) => {
    res.status(202).json(result);
  }).catch(next);
})

// app.post("/api/items", (req, res, next) => {
//   const {name,kitchen,bathroom} = req.body;
//   if (name !== ''){
//     sql`INSERT INTO items (name,kitchen,bathroom) VALUES (${name},${kitchen},${bathroom}) RETURNING *`.then((result) => {
//       res.status(201).json(result[0]);
//     }).catch(next)
// }})


//   if (location === 'kitchen' && operator === '-'){
//     sql`UPDATE items SET kitchen=kitchen-1 WHERE name=${name} RETURNING *`.then((result) => {
//       res.status(201).json(result[0]);
//     }).catch((error) => {
//       res.status(100).send('Hit non-negative constraint');
//     })
//   }
//   if (location === 'bathroom' && operator === '+'){
//     sql`UPDATE items SET bathroom=bathroom+1 WHERE name=${name} RETURNING *`.then((result) => {
//       res.status(201).json(result[0]);
//     }).catch(next);
//   }
//   if (location === 'bathroom' && operator === '-'){
//     sql`UPDATE items SET bathroom=bathroom-1 WHERE name=${name} RETURNING *`.then((result) => {
//       res.status(201).json(result[0]);
//     }).catch((error) => {
//       res.status(100).send('Hit non-negative constraint');
//     })
//   }


// app.delete("/api/items/:item", (req, res, next) => {
//   const { name } = req.body;
//   console.log(name);
//   sql`DELETE FROM items WHERE name=${name} RETURNING *`.then((result) => {
//     res.status(202).json(result);
//   }).catch(next)
// })

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