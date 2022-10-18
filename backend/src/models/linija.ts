import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Linija = new Schema({
    naziv: {
        type: String
    }

})

export default mongoose.model('Linija', Linija, 'linije');

