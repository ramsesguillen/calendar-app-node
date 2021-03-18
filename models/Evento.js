const { Schema, model } = require('mongoose');


const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

EventoSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}



module.exports = model('Evento', EventoSchema);

