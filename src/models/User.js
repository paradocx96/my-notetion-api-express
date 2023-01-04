import {Schema, model} from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin', 'super']
        }
    },
    {
        timestamps: true
    }
);

const User = model("users", UserSchema);
export default User;
