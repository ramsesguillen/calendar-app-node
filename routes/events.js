/**
 * Rutas de Events
 * host + /api/events
 */
const express = require('express');
const router = express.Router()
const { check } = require('express-validator');
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


// Tods tienen que pasar por la validacion del jwt
router.use( validarJWT );


router.get('/', getEventos);


router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'Fecha de finalización es obligatorio').custom( isDate ),
    validarCampos
], crearEvento);


router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'Fecha de finalización es obligatorio').custom( isDate ),
    validarCampos
], actualizarEvento);


router.delete('/:id', eliminarEvento);


module.exports = router;