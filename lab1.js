const http = require('http');

function getTimes(argument, callback) {
    let startTime = new Date();

    http.get(argument, (res) => {
        let endTime = new Date();
        callback(endTime - startTime);

    }).on('error', (err) => {
        callback(err);
    })
}

function printTimes(sample) {
    let Printout = [];

    sample.forEach(function (element) {
        getTimes(element, (result) => {
            Printout.push({ url: element, time: result });
            console.log({ url: element, time: result });
        })
    });
}



function getStatus(argument) {
    return new Promise((resolve, reject) => {
        http.get(argument, (res) => {
            if (res.statusCode >= 200 && res.statusCode <= 399) {
                resolve({ success: argument });
            }
            else if (res.statusCode >= 400 && res.statusCode <= 599) {
                resolve({ error: argument });
            }

        }).on('error', (err) => {
            reject(err);
        })
    })
}



function printStatus(sample) {
    let Printout = [];

    sample.forEach(function (element) {
        getStatus(element)
            .then((result) => {
                console.log(result);
            })
            .catch(error => {
                console.log('error');
            })
    });
}



const sample = [
    'http://www.google.com/',
    'http://www.spotify.com/us/',
    'http://twitter.com/',
    'http://google.com/nothing'
]

printTimes(sample);



printStatus(sample);