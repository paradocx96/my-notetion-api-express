import Note from "../models/Note";

// insert Note
export const insertNote = async (data) => {
    return await new Note(data).save();
};

// find All Notes
export const findAllNote = async (filter) => {
    return Note.find(filter);
};

// Get Note By ID
export const findBy = async (filter) => {
    return Note.findOne(filter);
};

// Update Note
export const findUpdate = async (id, data) => {
    return Note.findByIdAndUpdate(id, data, {new: true});
};

// Delete Note
export const findDelete = async (id) => {
    return Note.findByIdAndRemove(id);
};
