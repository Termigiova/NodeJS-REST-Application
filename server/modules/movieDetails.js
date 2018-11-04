const request = require('request');

const REST_API_URI = process.env.REST_API_URI;

exports.showAll = (req, res) => {

    request(`${REST_API_URI}/movieDetails`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('movieDetails/allMovieDetails.hbs', {
            navbarMovieDetailsActive: "active",
            pageTitle: "Detalles de la película",
            movie: body
        });
    });

};

exports.show = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movieDetails/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('movieDetails/singleMovieDetails.hbs', {
            navbarMovieDetailsActive: "active",
            pageTitle: "Detalles de la película",
            movie: body
        });
    });

};

exports.showUpdate = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/movieDetails/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('movieDetails/updateMovieDetails.hbs', {
            navbarMovieDetailsActive: "active",
            pageTitle: "Actualizar detalles de la película",
            movie: body
        });
    });

};

exports.update = (req, res) => {

    let id = req.params.id;

    let title = req.body.movieDetails.title;
    let year = req.body.movieDetails.year;
    let rated = req.body.movieDetails.rated;
    let released = req.body.movieDetails.released;
    let runtime = req.body.movieDetails.runtime;
    let countries = req.body.movieDetails.countries;
    countries = countries.split(',');
    let genres = req.body.movieDetails.genres;
    genres = genres.split(',');
    let director = req.body.movieDetails.director;
    let writers = req.body.movieDetails.writers;
    writers = writers.split(',');
    let actors = req.body.movieDetails.actors;
    actors = actors.split(',');
    let plot = req.body.movieDetails.plot;
    let poster = req.body.movieDetails.poster;
    let imdb = {
        rating: req.body.movieDetails.imdb.rating,
        votes: req.body.movieDetails.imdb.votes,
    };
    let tomato = {
        meter: req.body.movieDetails.tomato.meter,
        consensus: req.body.movieDetails.tomato.consensus,
        image: req.body.movieDetails.tomato.image,
        rating: req.body.movieDetails.tomato.rating,
        reviews: req.body.movieDetails.tomato.reviews,
        fresh: req.body.movieDetails.tomato.fresh,
        userMeter: req.body.movieDetails.tomato.userMeter,
        userRating: req.body.movieDetails.tomato.userRating,
        userReviews: req.body.movieDetails.tomato.userReviews,
    };
    let metacritic = req.body.movieDetails.metacritic;
    let awards = {
        nominations: req.body.movieDetails.awards.nominations,
        wins: req.body.movieDetails.awards.wins,
        text: req.body.movieDetails.awards.text,
    };
    let type = req.body.movieDetails.type;


    let formData = {
        title: title,
        year: year,
        rated: rated,
        released: released,
        runtime: runtime,
        countries: countries,
        genres: genres,
        director: director,
        writers: writers,
        actors: actors,
        plot: plot,
        poster: poster,
        imdb: imdb,
        tomato: tomato,
        metacritic: metacritic,
        awards: awards,
        type: type,
    };

    request.put({
        url: `${REST_API_URI}/movieDetails/${id}`,
        json: formData,
    }, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }

        res.render('movieDetails/singleMovieDetails.hbs', {
            navbarMovieDetailsActive: "active",
            pageTitle: "Detalles de la película Actualizada",
            movie: body
        });

    });

};

exports.showPost = (req, res) => {

    res.render('movieDetails/postMovieDetails.hbs', {
        navbarMovieDetailsActive: "active",
        pageTitle: "Crear detalles de la película"
    });

};

exports.post = (req, res) => {

    let title = req.body.movieDetails.title;
    let year = req.body.movieDetails.year;
    let rated = req.body.movieDetails.rated;
    let released = req.body.movieDetails.released;
    let runtime = req.body.movieDetails.runtime;
    let countries = req.body.movieDetails.countries;
    countries = countries.split(',');
    let genres = req.body.movieDetails.genres;
    genres = genres.split(',');
    let director = req.body.movieDetails.director;
    let writers = req.body.movieDetails.writers;
    writers = writers.split(',');
    let actors = req.body.movieDetails.actors;
    actors = actors.split(',');
    let plot = req.body.movieDetails.plot;
    let poster = req.body.movieDetails.poster;
    let imdb = {
        rating: req.body.movieDetails.imdb.rating,
        votes: req.body.movieDetails.imdb.votes,
    };
    let tomato = {
        meter: req.body.movieDetails.tomato.meter,
        consensus: req.body.movieDetails.tomato.consensus,
        image: req.body.movieDetails.tomato.image,
        rating: req.body.movieDetails.tomato.rating,
        reviews: req.body.movieDetails.tomato.reviews,
        fresh: req.body.movieDetails.tomato.fresh,
        userMeter: req.body.movieDetails.tomato.userMeter,
        userRating: req.body.movieDetails.tomato.userRating,
        userReviews: req.body.movieDetails.tomato.userReviews,
    };
    let metacritic = req.body.movieDetails.metacritic;
    let awards = {
        nominations: req.body.movieDetails.awards.nominations,
        wins: req.body.movieDetails.awards.wins,
        text: req.body.movieDetails.awards.text,
    };
    let type = req.body.movieDetails.type;


    let formData = {
        title: title,
        year: year,
        rated: rated,
        released: released,
        runtime: runtime,
        countries: countries,
        genres: genres,
        director: director,
        actors: actors,
        writers: writers,
        plot: plot,
        poster: poster,
        imdb: imdb,
        tomato: tomato,
        metacritic: metacritic,
        awards: awards,
        type: type,
    };

    request.post({
        url: `${REST_API_URI}/movieDetails`,
        json: formData,
    }, (error, response, id) => {
        if (error) {
            res.render('error.hbs');
        }

        console.log(id);
        res.redirect(`/movieDetails/show/${id}`);

    });

};

exports.delete = (req, res) => {

    let id = req.params.id;

    request.delete({
        url: `${REST_API_URI}/movieDetails/${id}`
    }, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }

        res.redirect('/movieDetails');

    });

};