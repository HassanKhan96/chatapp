const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    refs: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    roomId: { type: String, required: true},
    messages: [{
        type: {
            content: String,
            sentTime: { type: Date, default: new Date() },
            sender: { type: Schema.Types.ObjectId, required: true },
            receiver: { type: Schema.Types.ObjectId, require: true }
        },
        default: []
    }]
});

module.exports = mongoose.model('chat', chatSchema);