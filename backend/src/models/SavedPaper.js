const mongoose = require('mongoose');

const savedPaperSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        paperId: {
            type: String,
            required: true

        },
        title: {
            type: String,
            required: true
        },
        authors: {
            type: [String],
            default: []
        },
        year: {
            type: Number
        },
        abstract: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },

        summary: {
            type: [String],
            default: []
        },
        relevanceScore: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        },
        oneLiner: {
            type: String,
            default: ''
        },

        userNote: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);


savedPaperSchema.index({ user: 1, paperId: 1 }, { unique: true });

module.exports = mongoose.model('SavedPaper', savedPaperSchema);