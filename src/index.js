const express = require('express');
const app = express();
const request = require('request');
const async = require('async');
const { response } = require('express');
const bodyParser = require('body-parser');
const Axios = require('axios');
const cors = require('cors');
'Access-Control-Allow-Origin: https://127.0.0.1:3000';
'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'


app.use(express.json());
app.use(express.urlencoded({ extends: false }));
// app.use(bodyParser.json());
app.use(cors());

const handleResponse = (movies, allGeneros) => {


    const array = movies.map(item => {
        let nameGene = []
        item.genre_ids.map(item => {
            allGeneros.genres.map((obj2, key) => {
                if (item == obj2.id) {
                    nameGene.push(obj2.name)
                }
            })
        })
        return {
            title: item.title,
            date: item.release_date,
            gener: nameGene
        }
    })







    return array

    // console.log(movies);
    let respon = new Object();
    // movies.map((movie, key) => {
    //     let nameGene = []
    //     let nuevoArr = new Object();
    //     nuevoArr['title'] = movie.title
    //     nuevoArr['date'] = movie.release_date
    //     nuevoArr['img'] = movie.poster_path
    //     movie.genre_ids.map((dataId) => {
    //         allGeneros.genres.map((obj2, key) => {
    //             if (dataId == obj2.id) {
    //                 nameGene.push(obj2.name)
    //             }
    //         })
    //         nuevoArr['genero'] = nameGene
    //     })
    //     respon[key] = nuevoArr;
    // })
    return respon
    // return []
}

app.get('/upcoming', (req, res) => {
    console.log('first');
    let resp = []
    var options = {
        'languaje': 'es-US',
        'region': 'us'
    }
    Axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=dce6b909b6d767d7dfa7728cc3974829', {
        params: options
    }).then((response) => {
        const movie = response.data.results;
        Axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dce6b909b6d767d7dfa7728cc3974829')
            .then((response) => {
                if (response !== null) {

                    const allGeneros = response.data
                    resp = handleResponse(movie, allGeneros)
                    // console.log(resp);
                    res.json(resp)

                } else {
                    return []
                }
            })
            .catch((error) => {
                console.log(error);


            });
    });
});



const getGeneros = () => {
    Axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dce6b909b6d767d7dfa7728cc3974829')
        .then((response) => {
            if (results !== null) {
                return response.data;
            } else {
                return []
            }
        })
}








// // /////////////////////////////////////////////////////
//     async.times(0, (i, callback) => {
//         var options = {
//             url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=dce6b909b6d767d7dfa7728cc3974829',
//             qs: {
//                 'languaje': 'es-US',
//                 'page': i + 1,
//                 'region': 'us'
//             },
//         }
//         request(options, (error, response, body) => {
//             var result = JSON.parse(body);
//             var data = result.results;

//             console.log('Todos los datos');
//             var options2 = {
//                 url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=dce6b909b6d767d7dfa7728cc3974829'
//             }
//             request(options2, (error, response, body) => {
//                 var datoGeneros = JSON.parse(body);
//                 var generos = datoGeneros.genres;
//                 let respon = new Object();
//                    data.map((movie, key) => {
//                     let nameGene = []
//                     let nuevoArr = new Object();

//                     nuevoArr['title'] = movie.title
//                     nuevoArr['date'] = movie.release_date
//                     nuevoArr['img'] = movie.poster_path
//                     movie.genre_ids.map((dataId) => {

//                         generos.map((obj2, key) => {
//                             if (dataId == obj2.id) {
//                                 nameGene.push(obj2.name)
//                             }
//                         })
//                         // console.log(nameGene);
//                         nuevoArr['genero'] = nameGene
//                     })





//                     respon[key] = nuevoArr;
//                 })
//                 // console.log(respon);
//                 res.json(respon)
//             });
//             callback(null, data);
//         }
//         );
//     }
//         , (err, results, genres) => {

//             if (results !== null) {
//                 // console.log(genres);
//                 var IDs = new Object();
//                 results.length > 0 && results.map((obj, key) => (
//                     obj.map((obj2, key) => (
//                         IDs[key] = getformatedMoment(obj2)
//                     ))

//                 ))
//             }

//         })
// });

app.listen('4000', () => {
    console.log('listening on port 4000')
})