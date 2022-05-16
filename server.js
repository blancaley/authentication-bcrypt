import express from "express";
import session from "express-session";

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(` Listening on port ${port}`))