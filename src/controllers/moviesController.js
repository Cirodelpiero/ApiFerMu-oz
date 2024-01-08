const createError = require('http-errors')
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const paginate = require('express-paginate')
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../services/movies.services');





const moviesController = {
    'list': async (req, res) => {
        try {
            const {keyword} = req.query;
            const { movies, total } = await getAllMovies(req.query.limit, req.skip, keyword);
            const pageCount = Math.ceil(total / req.query.limit);
            const currentPage = req.query.page;
            const pages = paginate.getArrayPages(req)(pageCount, pageCount, currentPage)

            return res.status(200).json({
                ok: true,
                meta: {
                    total,
                    pageCount,
                    currentPage,
                    pages
                },
                data: movies
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Hubo un error'
            })
        }


        /*db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })*/
    },
    'detail': async (req, res) => {
        try {
            const movie = await getMovieById(req.params.id)
            return res.status(200).json({
                ok: true,

                data: movie
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Hubo un error'
            })
        }
        /*db.Movie.findByPk(req.params.id,
            {
                include: ['genre']
            })
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });*/
    },
    
    create: async (req, res) => {
        try {

            const { title, release_date, awards, rating, length, genre_id, actors } = req.body;
            if ([title, release_date, awards, rating].includes('' || undefined)) {
                throw createError(400, 'Los campos title, release_date, awards, rating son obligatorios')
            }

            const newMovie = await createMovie({
                title,
                release_date,
                awards,
                rating,
                length,
                genre_id
            },
                actors
            );

            return res.status(200).json({
                ok: true,

                msg: 'Pelicula creada con exito',
                url: `${req.protocol}://${req.get('host')}/api/v1/movies/${newMovie.id}`,
                data: newMovie
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Hubo un error'
            })
        }
        /*Movies.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            )
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))*/
    },
    
    update: async (req, res) => {

        try {


            const movieUpdated = await updateMovie(req.params.id, req.body)


            return res.status(200).json({
                ok: true,
                msg: 'Pelicula Editada con exito',
                data: movieUpdated,
                url: `${req.protocol}://${req.get('host')}/api/v1/movies/${movieUpdated.id}`,

            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Hubo un error'
            })
        }
        /*let movieId = req.params.id;
        Movies
            .update(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                },
                {
                    where: { id: movieId }
                })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))*/
    },
    
    destroy: async(req, res) => {

        try {

            await deleteMovie(req.params.id);


            return res.status(200).json({
                ok: true,
                msg: 'Pelicula eliminada con exito',
            });

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || "Upss, hubo un error :(",
            });

        }
        /*let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))*/
    }
}

module.exports = moviesController;