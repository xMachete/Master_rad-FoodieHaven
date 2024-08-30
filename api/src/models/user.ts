import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        email: {type: String, unique: true},
        password: {type: String},
    }
)

export default mongoose.model('User', User, 'users');
