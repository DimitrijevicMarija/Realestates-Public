import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Tip = new Schema({
    naziv: {
        type: String
    }

})

export default mongoose.model('Tip', Tip, 'tipovi');

