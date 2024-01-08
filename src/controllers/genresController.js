const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    list: (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                return res.status(200).json({
                    ok :true,
                    meta: {
                        total: genres.length
                    },
                    data: genres,
                })
            })
            .catch(error => console.log(error))
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
        .then(genre => {
            return res.status(200).json({
                ok :true,
                meta: {
                    
                },
                data: genre,
            })
        })
        .catch(error => console.log(error))
    }

}

module.exports = genresController;