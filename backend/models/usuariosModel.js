var pool = require('./bd.js'); // Asume que 'bd.js' está en el mismo nivel o ajusta la ruta
var md5 = require('md5');

async function getUserByEmailAndPassword(email, password) {
    try {
        var query = "select * from usuarios where email = ? and password = ? limit 1";
        var rows = await pool.query(query, [email, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByEmailAndPassword }