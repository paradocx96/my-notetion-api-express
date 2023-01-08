const {createNote, getAllNotes, deleteNote, updateNote, getNoteByAuthor, getNoteById} = require('../controllers/Note');
const {userAuthenticated, checkUserRole} = require('../controllers/Auth');
const router = require('express').Router();

// Insert Note
router.post('/create', userAuthenticated, async (req, res) => {
    return await createNote(req, res);
});

// Find all notes
router.get('/get', userAuthenticated, async (req, res) => {
    return await getAllNotes(req, res);
});

// Find note by id
router.get('/get/:id', userAuthenticated, async (req, res) => {
    return await getNoteById(req, res);
});

// Find note by id
router.get('/get-author/:id', userAuthenticated, async (req, res) => {
    return await getNoteByAuthor(req, res);
});

// Update single note
router.patch('/update/:id', userAuthenticated, async (req, res) => {
    return await updateNote(req, res);
});

// Delete note
router.delete('/delete/:id', userAuthenticated, checkUserRole(['super', 'admin']), async (req, res) => {
    return await deleteNote(req, res);
});

module.exports = router;
