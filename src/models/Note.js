const Paginator = require('mongoose-paginate-v2');
const {Schema, model} = require('mongoose');

const NoteSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        favorite: {
            type: Boolean,
            default: false
        },
        author: {
            ref: "users",
            type: Schema.Types.ObjectId,
        },
        created: {
            type: Date,
            default: Date.now
        },
    },
    {timestamps: true}
);

NoteSchema.plugin(Paginator);
module.exports = model('notes', NoteSchema);
