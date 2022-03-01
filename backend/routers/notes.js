const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');
const { body,validationResult} = require('express-validator');


// 1. Get all the notes using : GET /api/auth/fetchallnotes : Login required

router.get('/fetchallnotes', fetchuser,
    async (req, res) => {

        const notes = await Note.find({
            user: req.user.id
        });

        res.json(notes);
    })

//2. add a new note using : POST /api/notes/addnote : Login required

router.post('/addnote', fetchuser, [
        body('title', 'Enter a Valid title').isLength({min: 3}),
        body('description', 'description must be atleast 5 characters').isLength({min: 5})
    ], async (req, res) => {

        try {
            const {title,description,tag} = req.body;
            // if there are errrors send the bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }
            // creating a new note 
            const note = new Note({title,description,tag,user: req.user.id})
            const savedNote = await note.save();


            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server error');
        }



    })

    //3. Update an existing Note using : PUT /api/note/updatenote/:id : Login required
    router.put('/updatenote/:id', fetchuser,async (req, res) =>{
        const {title, descrption, tag} = req.body;

        //  creating newNote Object
        const newNote = {}
        if(title){newNote.title = title}
        if(descrption){newNote.descrption = descrption}
        if(tag){newNote.tag = tag}
        // find the updated note and update it
        let note = await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send('Not Found');
        }

        //  here note.user.toString() is providing the user id
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})

        res.json(note);
    })


    //4. Delete an existing Note using : DELETE /api/note/deletenote : Login required
    router.delete('/deletenode/:id', fetchuser,async (req, res) =>{
        const {title, descrption, tag} = req.body;

        
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send('Not Found');
        }
        // allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({"Success": "The note is deleted successfully", note: note});
    })

module.exports = router;