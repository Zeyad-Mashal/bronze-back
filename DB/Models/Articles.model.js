const mongoose = require('mongoose');
const ArticlesSchema = mongoose.Schema({
    image: [
        {
        url: {type: String, required: true},
        public_id: {type: String, required: true},
    }],
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
},
{ 
    timestamps: true

 },
)

const ArticlesModel = mongoose.model('articles', ArticlesSchema);
module.exports = ArticlesModel;