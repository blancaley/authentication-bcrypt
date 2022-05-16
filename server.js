import express from "express";
import session from "express-session";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("loginproject");
const usersCollection = db.collection("users");

app.use(express.static("public"));

app.use(express.json());

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret',
  cookie: {
    maxAge: 5 * 60 * 1000 // 5 minutes
  }
 }));

// Skapa en route där en användare kan logga in
app.post("/api/login", async (req, res) => {
  // Kolla om användaren finns i databasen
  const foundUser = await usersCollection.findOne({ 
    user: req.body.user, 
    pass: req.body.pass 
  })

  if (foundUser) {
    // Spara en variabel “user” på req.session som innehåller username
    req.session.user = foundUser.user;

    res.json({
      user: foundUser.user
    });
  } else {
    // Returnera en 401 och ett meddelande
    res.status(401).json({ error: "Unauthorized" });
  }
})

// Route där man kan kontrollera om man är inloggad
app.get("/api/loggedin", (req, res) => {
  if (req.session.user) {
    res.json({
      user: req.session.user
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Route för utloggning
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      loggedin: false
    });
  });
});

// Route för att registrera ny user
app.post("/api/register", async (req, res) => {
  await usersCollection.insertOne(req.body);
  res.json({
    success: true,
    user: req.body.user
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`))