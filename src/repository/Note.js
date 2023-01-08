const Note = require("../models/Note");

// insert Note
const insertNote = async (data) => {
    return await new Note(data).save();
};

// find All Notes
const findAllNote = async (filter) => {
    return Note.find(filter);
};

// Get Note By ID
const findBy = async (filter) => {
    return Note.findOne(filter);
};

// Update Note
const findUpdate = async (id, data) => {
    return Note.findByIdAndUpdate(id, data, {new: true});
};

// Delete Note
const findDelete = async (id) => {
    return Note.findByIdAndRemove(id);
};

module.exports = {
    insertNote,
    findAllNote,
    findBy,
    findUpdate,
    findDelete
}
