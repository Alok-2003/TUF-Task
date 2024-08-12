import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "bubdaokkftewbar8fhaj-mysql.services.clever-cloud.com",
    user: "ukhiun6gxvhlfeh5",
    password: "s9MoTb2SyM9apmONDwDh",
    database: "bubdaokkftewbar8fhaj",
  });

// Connect to the MySQL server
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello, this is the backend of flashcards");
});

app.get("/allcards", (req, res) => {
  const q = "SELECT * FROM flashcard;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/allcards", (req, res) => {
  const q = "INSERT INTO flashcard (`question`,`answer`) VALUES (?)";
  // const values= ["What is React?","A JavaScript library for building user interfaces."]
  const values = [req.body.question, req.body.answer];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book created Succcesfully");
  });
});

app.delete("/allcards/:id",(req,res)=>{
    const cardId= req.params.id;
    const q= "DELETE FROM flashcard WHERE id = ?"
    db.query(q, [cardId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book deleted Succcesfully");
      });
})

app.put("/allcards/:id", (req, res) => {
    const cardId = req.params.id;
    const q = "UPDATE flashcard SET `question`= ?, `answer`= ? WHERE id = ?";
  
    const values = [
      req.body.question,
      req.body.answer,
    ];
  
    db.query(q, [...values,cardId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

// Start the server
app.listen(8800, () => {
  console.log("Connected to backend!");
});
