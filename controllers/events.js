const { response } = require("express");
const { Evento } = require("../models");


//****



const getEventos = async( req, res = response ) => {

    try {
        const eventos = await Evento.find()
                                    .populate('usuario', 'name');
        return res.json({
            ok: true,
            eventos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}



const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {
        evento.usuario = req.uid;
        const eventoGuardado = await evento.save();
        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}



const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if ( evento.usuario.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No está autorizado'
            });
        }

        const nuevoEvento = {
            ...req.body,
            usuario: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} );

        return res.json({
            ok: true,
            evento: eventoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



const eliminarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if ( evento.usuario.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No está autorizado'
            });
        }

        await Evento.findByIdAndDelete( eventoId);

        return res.json({
            ok: true,
            msg: 'Eliminado'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}


