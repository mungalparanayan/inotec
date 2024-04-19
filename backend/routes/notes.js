const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');  

// ROUTE 1 :- Get All the Notes using : GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2 :- add a new Note using : POST "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({min: 3}),
    body('description', "Description must be atleast 5 characters").isLength({min: 5}),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        // If there are errors, return bad request and the errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 :- Update an existing Note using : PUT "api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    try {
        // Create a newNote object
        const newNode = {}
        if(title) {newNode.title = title};
        if(description) {newNode.description = description};
        if(tag) {newNode.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not found")
        }

        // Allow updation only if user owns this Note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNode}, {new: true})
        res.json(note);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 :- Delete an existing Note using : DELETE "api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not found")
        }

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucess" : "Note has been deleted", note : note});
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router