const { response } = require('express');

const getTodo = (req, res = response) => {
    const busqueda = req.params.busqueda;
    res.json({
        ok: true,
        busqueda,
        msg: 'buscando a todos...'
    });
}

module.exports = {
    getTodo
}