const router = require('express').Router(); // Using Express-Router
const User = require('../models/User');
const Notes = require("../models/Notes");
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
  let success = false;
  try {
    const notes = await Notes.find({ user: req.user.id });
    success = true;
    return res.json({success, notes});
  } catch (error) {

    return res.json({success, error: "Can't Fetch Notes :("})
  }

  // req.user.id, the data is comming from "Headers", through the "middleware" [fetchUser()]
  // console.log(req.user.id);

});


router.post('/addnote',
[
  // Defining [Validation-Rules], MOST-IMPORTANT-POINT:- Ham Yahaan -> "req.body" Ki Values Ko Validate Krrhy hen.. Na Ke "Mongoose-Schema Ko"
  body('title', 'at least 4 characters are required for title').isLength({ min: 4 }),
  body('description', 'at least 5 characters are required description ').isLength({ min: 8 }),
], fetchUser,  async (req,  res) => {
  
  const errors = validationResult(req);
  let success = false;
  // If any Fields Doesn't Obey The "Validation-Rule", Then Log The Validation-Error
  if (!errors.isEmpty()) {
    return res.status(400).send({error: errors.array()});
  }
  
    const {title, description, tag} = req.body;
    
    try {
      const notes = new Notes({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag
      });
    
      await notes.save();
      console.log("done...", req.user)
      success =true;
      return res.status(200).send({success, notes})
      
    } catch (_err) {
      // console.log(_err.message);
      return res.send({success, error:_err})
    }
})

router.put('/updatenote/:id', fetchUser, async(req, res)=> {
  let success = false;
  // destructing fields from req. 
  const {title, description, tag} = req.body;
  
  // would store the newNote
  let newNote = {};

  // if user provided, the given-field then add them to the "newNotes" Object
  if(title) newNote.title = title;
  if(description) newNote.description = description;
  if(tag) newNote.tag = tag;

  
  // find the note and update-the-note
  const note = await Notes.findById(req.params.id);

  // console.log(note)
  
  if(!note) return res.status(404).send({success, "message": "Not Found :("});

  // console.log("documnet id the owner of the note", req.user.id == note.user._id)       // one is comming from the user-jwt & the other one is from owner-notes-Data-Base (server)

  // Security, matching the loginned ID with the User-Note's ID, if don't match then kuch na kuch to garbar h.. daya :D
  if (req.user.id != note.user._id) return res.status(401).send({success, "message": "Un-Authoriazed Request, Not-Allowed! :("});


  // find and update, also the other field exists in {newNote}, then add it too into the database
  // "DATA-BASE Ki UNIQUE-User-ID equal honi Chihye LOGGED-In-(JWT-TOKEN) USER-ID Ky!" 
  await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
   
  // returning response for updation-the-note
  return res.status(200).send({success, "message": "successfully updated", "updatedNote": newNote});
  

});

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  let success = false;
  const note = await Notes.findById(req.params.id);

  if(!note) return res.status(404).send({success, "message": "Not Found :("});


  // Kya ye 'note' object usi user ka h.. ? "us k jwt-token sy id nikaal kr.. match kro us note-object k user-id sy" that's it..! 
 	if (req.user.id != note.user._id) return res.status(401).send({success, "message": "Un-Authoriazed Request, Not-Allowed! :("});


  // find the document by note-document-object-id & remove...
  const deletedNote = await Notes.findByIdAndDelete(req.params.id);
  success = true;
  // return res.status(200).send("Successfully deleted..!", deletedNote);
  res.send({success, deletedNote})

});
  

module.exports = router;
