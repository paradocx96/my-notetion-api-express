const {insertNote, findAllNote, findBy, findDelete, findUpdate} = require('../repository/Note');
const logger = require("../utils/logger");
const Note = require("../models/Note");

// Insert Note
const createNote = async (req, res) => {
    try {
        let {body} = req;
        let note = new Note({
            author: req.user.username,
            ...body,
        })

        const result = await insertNote(note);
        if (!result) {
            return res.status(400).json({
                message: 'Cannot create note!!!',
                success: false
            });
        }

        // Return response
        return res.status(201).json({
            message: 'Note created successfully!!!',
            success: true
        });
    } catch (err) {
        logger.info("Note Creation - Error: ", err);
        return res.status(500).json({
            message: 'Unable to create note!!!',
            success: false
        });
    }
};

// Find All Notes
const getAllNotes = async (req, res) => {
    try {
        let result = await findAllNote({});
        if (!result) {
            return res.status(400).json({
                message: 'Cannot find notes!!!',
                success: false
            });
        }

        // Return response
        return res.status(200).json(result);
    } catch (err) {
        logger.info("Note Find All - Error: ", err);
        return res.status(500).json({
            message: 'Unable to find notes!!!',
            success: false
        });
    }
};

// Find By ID
const getNoteById = async (req, res) => {
    try {
        let result = await findBy({_id: req.params.id});
        if (!result) {
            return res.status(400).json({
                message: 'Cannot find note by id!!!',
                success: false
            });
        }

        // Return response
        return res.status(200).json(result);
    } catch (err) {
        logger.info("Note Find By Id- Error: ", err);
        return res.status(500).json({
            message: 'Unable to find note by id!!!',
            success: false
        });
    }
};

// Find By Author
const getNoteByAuthor = async (req, res) => {
    try {
        let result = await findAllNote({author: req.params.id});
        if (!result) {
            return res.status(400).json({
                message: 'Cannot find note by author!!!',
                success: false
            });
        }

        // Return response
        return res.status(200).json(result);
    } catch (err) {
        logger.info("Note Find By Author - Error: ", err);
        return res.status(500).json({
            message: 'Unable to find note by author!!!',
            success: false
        });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {
        let findNote = await findBy({_id: req.params.id});
        if (!findNote) {
            return res.status(400).json({
                message: 'Unable find note!!!',
                success: false
            });
        }

        let result = await findUpdate(req.params.id, req.body);
        if (!result) {
            return res.status(400).json({
                message: 'Unable update note!!!',
                success: false
            });
        }

        // Return response
        return res.status(200).json(result);
    } catch (err) {
        logger.info("Note Update - Error: ", err);
        return res.status(500).json({
            message: 'Unable to update note!!!',
            success: false
        });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        let findNote = await findBy({_id: req.params.id});
        if (!findNote) {
            return res.status(400).json({
                message: 'Unable find note!!!',
                success: false
            });
        }

        let result = await findDelete(req.params.id);
        if (!result) {
            return res.status(400).json({
                message: 'Unable delete note!!!',
                success: false
            });
        }

        // Return response
        return res.status(410).json(result);
    } catch (err) {
        logger.info("Note Delete - Error: ", err);
        return res.status(500).json({
            message: 'Unable to delete note!!!',
            success: false
        });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteByAuthor,
    getNoteById,
    updateNote,
    deleteNote
}
