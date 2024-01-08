const express = require('express');
const app = express();
const cors = require('cors')
const paginate = require('express-paginate');

const movieApiRoutes = require('./routes/api.v1/movies.routes')
const genreApiRoutes = require('./routes/api.v1/genres.routes')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(paginate.middleware(8,50));
app.use('/api/v1/movies',movieApiRoutes)
app.use('/api/v1/genres',genreApiRoutes)


app.use('*', (req,res) => res.status(404).json({
    ok: false,
    status: 404,
    error: 'Not Found'
}))

app.listen('3001', () => console.log('Servidor ATR corriendo en el puerto 3001'));
