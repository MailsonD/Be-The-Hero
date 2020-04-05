const crypt = require('crypto');
const connection = require('../database/connection');

module.exports = {
    /**
     * LIST METHOD
     */
    async list(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    /**
     * CREATE METHOD
     */
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypt.randomBytes(4).toString('HEX');

        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });
        } catch (insertErro) {
            console.log('Was a error on the insert of a new ONG');
            console.error(insertErro);
            res.status(400).send('one of the required attributes was not filled in correctly!');
        }

        return res.json({ id });
    },


};