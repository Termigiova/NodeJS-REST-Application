require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const request = require('request');

const app = express();
const port = process.env.PORT;
const REST_API_URI = process.env.REST_API_URI;

hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Página de inicio',
        welcomeMessage: 'Bienvenidos!'
    });

});

app.get('/movies', (req, res) => {

    request(`${REST_API_URI}/movies`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('movies/allMovies.hbs', {
            pageTitle: "Películas",
            movie: body
        });
    });

});

app.get('/movies/show/:id', (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movies/${id}`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('movies/singleMovie.hbs', {
            pageTitle: "Película",
            movie: body
        });
    });

});

app.get('/movies/update/:id', (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movies/${id}`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('movies/updateMovie.hbs', {
            pageTitle: "Actualizar película",
            movie: body
        });
    });

});

app.post('/movies/update/:id',(req, res) => {

    let id = req.params.id;

    let title = req.body.movie.title;
    let year = req.body.movie.year;
    let imdb = req.body.movie.imdb;
    let type = req.body.movie.type;

    let formData = {
        title: title,
        year: year,
        imdb: imdb,
        type: type
    };

    request.put({
        url: `${REST_API_URI}/movies/${id}`,
        json: formData,
    }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }

        res.render('movies/singleMovie.hbs', {
            pageTitle: "Película Actualizada",
            movie: body
        });

    });

});

app.get('/movies/post', (req, res) => {

    res.render('movies/postMovie.hbs', {
        pageTitle: "Crear película"
    });

});

app.post('/movies/post', (req, res) => {

    let title = req.body.movie.title;
    let year = req.body.movie.year;
    let imdb = req.body.movie.imdb;
    let type = req.body.movie.type;

    let formData = {
        title: title,
        year: year,
        imdb: imdb,
        type: type
    };

    request.post({
        url: `${REST_API_URI}/movies`,
        json: formData,
    }, (error, response, id) => {
        if (error) { res.render('error.hbs'); }

        res.redirect(`/movies/show/${id}`);

    });

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});