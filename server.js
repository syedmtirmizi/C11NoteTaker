// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const fs = require('fs');


// Sets up the Express app to handle data parsing
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req,res) => {
    let newNote = req.body;
    let listNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let lengthNote = (listNote.length).toString();

    newNote.id = lengthNote;

    listNote.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(listNote));
    res.json(listNote);
})

app.delete("/api/notes/:id", (req,res) => {
    let listNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();

    listNote = listNote.filter(selected => {
        return selected.id !== noteId;
    })

    fs.writeFileSync('./db/db.json', JSON.stringify(listNote));
    res.json(listNote);
});



// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});
