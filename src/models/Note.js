import {Schema, model} from 'mongoose';
import Paginator from 'mongoose-paginate-v2';

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

const Note = model("notes", NoteSchema);
export default Note;
