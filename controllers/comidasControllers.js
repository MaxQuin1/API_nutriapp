const { json } = require("express")
const connection = require("../database")

const obtenerComidas = (peticion, respuesta) => {
    const sql = "SELECT * FROM comidas";
    connection.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.json({ error: "error en la consulta" });
        }
        return respuesta.json({ listacomidas: resultado });
    });
};

const crearComida = (peticion, respuesta) => {
    const { id_paciente, nombre_alimento, cantidad_dias  } = peticion.body
    connection.query('INSERT INTO comidas (id_paciente, nombre_alimento, cantidad_dias) VALUES (?, ?, ?)', [id_paciente, nombre_alimento, cantidad_dias], (error, results) => {
        if (error) {
            console.error("Error al agregar comida", error)
            respuesta.status(500).json({
                error: "Error al agregar comida"
            })
        } else {
            respuesta.json({ menssage: "comida agregada" })
        }
    })
}

const elimninarComidasPorId = (peticion, respuesta) => {
    const id = peticion.params.id_cita

    connection.query('DELETE FROM comida WHERE id_alimento = ?', [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar", error);
            respuesta.status(500), json({ error: "Ocurrio un error eliminar" })
        } else if (results.length === 0) {
            respuesta.status(500).json({ error: "Error 1234" })
        } else {
            respuesta.json({ message: "la comida no fue eliminada" })
        }
    })

}
module.exports = {
    obtenerComidas,
    crearComida,
    elimninarComidasPorId
};