// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true, index: true, sparse: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        fullname: { type: String },
        avatar: { type: String },
        favorites: [
            {
                id: {type: Number},
                type: {type: String},
                name: {type: String},
                poster_path: {type: String},
            },
        ],
        history: [
            {
                id: {type: Number},
                type: {type: String},
                name: {type: String},
                poster: {type: String},
                date: {type: Date},
            },
        ],
    },
    {
        timestamps: true,
    },
);

// export default mongoose.model('User', User);
module.exports = mongoose.model('User', User);