const request = require('request');

const REST_API_URI = process.env.REST_API_URI;

exports.showAll = (req, res) => {

    request(`${REST_API_URI}/movies`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('movies/allMovies.hbs', {
            navbarMoviesActive: "active",
            pageTitle: "Películas",
            movie: body
        });
    });

};

exports.show = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movies/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('movies/singleMovie.hbs', {
            navbarMoviesActive: "active",
            pageTitle: "Película",
            movie: body
        });
    });

};

exports.showUpdate = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movies/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('movies/updateMovie.hbs', {
            navbarMoviesActive: "active",
            pageTitle: "Actualizar película",
            movie: body
        });
    });

};

exports.update = (req, res) => {

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
        if (error) {
            res.render('error.hbs');
        }

        res.render('movies/singleMovie.hbs', {
            navbarMoviesActive: "active",
            pageTitle: "Película Actualizada",
            movie: body
        });

    });

};

exports.showPost = (req, res) => {

    res.render('movies/postMovie.hbs', {
        navbarMoviesActive: "active",
        pageTitle: "Crear película"
    });

};

exports.post = (req, res) => {

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
        if (error) {
            res.render('error.hbs');
        }

        res.redirect(`/movies/show/${id}`);

    });

};

exports.delete = (req, res) => {

    let id = req.params.id;

    request.delete({
        url: `${REST_API_URI}/movies/${id}`
    }, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }

        res.redirect('/movies');

    });

};