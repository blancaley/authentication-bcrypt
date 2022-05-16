import express from "express";
import session from "express-session";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => console.log(` Listening on port ${port}`))