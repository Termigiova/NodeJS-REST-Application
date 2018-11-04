const request = require('request');

const REST_API_URI = process.env.REST_API_URI;

exports.showAll = (req, res) => {

    request(`${REST_API_URI}/reviews`, { json: true }, (error, response, body) => {
        if (error) { res.render('error.hbs'); }
        res.render('reviews/allReviews.hbs', {
            navbarReviewsActive: "active",
            pageTitle: "Reseñas",
            review: body
        });
    });

};

exports.show = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/reviews/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('reviews/singleReview.hbs', {
            navbarReviewsActive: "active",
            pageTitle: "Reseñas",
            review: body
        });
    });

};

exports.showUpdate = (req, res) => {

    let id = req.params.id;

    request(`${REST_API_URI}/reviews/${id}`, {json: true}, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }
        res.render('reviews/updateReview.hbs', {
            navbarReviewsActive: "active",
            pageTitle: "Actualizar reseña",
            review: body
        });
    });

};

exports.update = (req, res) => {

    let id = req.params.id;

    let rating = req.body.review.rating;
    let date = req.body.review.date;
    let reviewer = req.body.review.reviewer;
    let text = req.body.review.text;

    let formData = {
        rating: rating,
        date: date,
        reviewer: reviewer,
        text: text
    };

    request.put({
        url: `${REST_API_URI}/reviews/${id}`,
        json: formData,
    }, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }

        res.render('reviews/singleReview.hbs', {
            navbarReviewsActive: "active",
            pageTitle: "Reseña Actualizada",
            review: body
        });

    });

};

exports.showPost = (req, res) => {

    res.render('reviews/postReview.hbs', {
        navbarReviewsActive: "active",
        pageTitle: "Crear reseña"
    });

};

exports.post = (req, res) => {

    let rating = req.body.review.rating;
    let date = req.body.review.date;
    let reviewer = req.body.review.reviewer;
    let text = req.body.review.text;

    let formData = {
        rating: rating,
        date: date,
        reviewer: reviewer,
        text: text
    };

    request.post({
        url: `${REST_API_URI}/reviews`,
        json: formData,
    }, (error, response, id) => {
        if (error) {
            res.render('error.hbs');
        }

        res.redirect(`/reviews/show/${id}`);

    });

};

exports.delete = (req, res) => {

    let id = req.params.id;

    request.delete({
        url: `${REST_API_URI}/reviews/${id}`
    }, (error, response, body) => {
        if (error) {
            res.render('error.hbs');
        }

        res.redirect('/reviews');

    });

};