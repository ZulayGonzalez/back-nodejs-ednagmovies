const { response } = require('express');
const express = require('express');
const app = express();
const request = require('request');
const async = require('async');

app.get('/upcoming', (req, res) => {
    async.times(2, (i, callback) => {
        var options = {
            url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=dce6b909b6d767d7dfa7728cc3974829',
            qs: {
                'languaje': 'es-US',
                'page': i + 1,
                'region': 'us'
            },
        }
        request(options, (error, response, body) => {
            var result = JSON.parse(body);
            var data = result.results;
            callback(null, data);
        });
    }, (err, results) => {
        res.json(results);
    });
})

app.listen('3000', () => {
    console.log('listening on port 3000')
})