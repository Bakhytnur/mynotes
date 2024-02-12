const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json())

//routes

//create a note

app.post("/notes", async(req, res) => {
    try {
        const { body } = req.body;
        const newNote = await pool.query("INSERT INTO notes (description) VALUES($1) RETURNING *", [body]);
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all notes

app.get("/notes", async(req, res) => {
    try {
        const allNotes = await pool.query("SELECT * FROM notes");
        res.json(allNotes.rows);
        console.log(allNotes)
    } catch (error) {
        console.error(error.message);
    }
})
//get a note

app.get("/notes/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [id]);
        res.json(note.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
} )

//update a note

app.put("/notes/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const updateNote = await pool.query(
            "UPDATE notes SET description = $1 WHERE note_id = $2", [body, id]
        );

        res.json("Note was updated")
    } catch (err) {
        console.error(err.message);
    }
})

//delete a note

app.delete("/notes/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteNote = await pool.query("DELETE FROM notes WHERE note_id = $1", [id]);
        res.json("Note was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5002, () => {
    console.log("server has started on port 5002")
});