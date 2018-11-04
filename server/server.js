// Config files

require('./config/config');

// Module dependencies

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT;
const movies = require('./modules/movies');
const movieDetails = require('./modules/movieDetails');
const reviews = require('./modules/reviews');

// Config

hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + './../views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// General

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Página de inicio',
        welcomeMessage: 'Bienvenidos!'
    });

});

// Movies

app.get('/movies', movies.showAll);
app.get('/movies/show/:id', movies.show);

app.get('/movies/update/:id', movies.showUpdate);
app.post('/movies/update/:id', movies.update);

app.get('/movies/post', movies.showPost);
app.post('/movies/post', movies.post);

app.get('/movies/delete/:id', movies.delete);

// Movie Details

app.get('/movieDetails', movieDetails.showAll);
app.get('/movieDetails/show/:id', movieDetails.show);

app.get('/movieDetails/update/:id', movieDetails.showUpdate);
app.post('/movieDetails/update/:id', movieDetails.update);

app.get('/movieDetails/post', movieDetails.showPost);
app.post('/movieDetails/post', movieDetails.post);

app.get('/movieDetails/delete/:id', movieDetails.delete);

// Reviews

app.get('/reviews', reviews.showAll);
app.get('/reviews/show/:id', reviews.show);

app.get('/reviews/update/:id', reviews.showUpdate);
app.post('/reviews/update/:id', reviews.update);

app.get('/reviews/post', reviews.showPost);
app.post('/reviews/post', reviews.post);

app.get('/reviews/delete/:id', reviews.delete);


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});