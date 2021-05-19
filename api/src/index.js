const express = require('express');

var cors = require('cors')
const mysql = require('mysql');
const logger = require('./utils/logger');

const app = express();

const connection = mysql.createConnection({
    host: 'mysql-container',
    user: 'root',
    password: 'thecatapi',
    database: 'thecatapi'

});

connection.connect();

app.get('/', function (req, res) {
    res.status(200).send("Hello World!");
    logger.info(`"Server Sent A Hello World!" -  ${req.method}`);
})

// app.use((err,req,res,next) => {
//     res.status(500).send('Internal Server Error!');
//     logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// })

// app.use((req,res,next) => {
//     res.status(404).send("PAGE NOT FOUND");
//     logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// })


app.get('/cats', function(req, res) {
    try {
    connection.query('SELECT * FROM tbcats', function (error, results) {
  
        if (error) { 
            throw error
        };
      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, name: item.name,  origin: item.origin, temperament: item.temperament, description: item.description, img1: item.img1,  img2: item.img2, img3: item.img3})));
    });
    logger.info(`Accessing /cats by method:  ${req.method}`);
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

app.get('/cats/:id', function(req, res) {
    try {
    connection.query('SELECT * FROM tbcats WHERE id =' + req.params.id, function (error, results) {
  
        if (error) { 
            throw error
        };

      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, name: item.name,  origin: item.origin, temperament: item.temperament, description: item.description, img1: item.img1,  img2: item.img2, img3: item.img3})));
    });

    logger.info(`Accessing /cats by method:  ${req.method}  |  Requesting the data with id:  ${req.params.id}`);
    
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

app.get('/cats/temperament/:temp', function(req, res) {
    try {
    connection.query(`SELECT * FROM tbcats WHERE temperament LIKE "%${req.params.temp}%";`, function (error, results) {
  
        if (error) { 
            throw error
        };

      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, name: item.name,  origin: item.origin, temperament: item.temperament, description: item.description, img1: item.img1,  img2: item.img2, img3: item.img3})));
    });

    logger.info(`Accessing /cats/temperament/ by method:  ${req.method}  |  Requesting the data with temperament like:  ${req.params.temp}`);
    
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

app.get('/cats/origin/:origin', function(req, res) {
    try {
    connection.query(`SELECT * FROM tbcats WHERE origin LIKE "%${req.params.origin}%";`, function (error, results) {
  
        if (error) { 
            throw error
        };

      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, name: item.name,  origin: item.origin, temperament: item.temperament, description: item.description, img1: item.img1,  img2: item.img2, img3: item.img3})));
    });

    logger.info(`Accessing /cats/origin by method:  ${req.method}  |  Requesting the data with origin like:  ${req.params.origin}`);
    
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});


app.get('/hats', function(req, res) {
    try {
        connection.query('SELECT * FROM tbhats', function (error, results) {
    
            if (error) { 
                throw error
            };
            res.setHeader('Access-Control-Allow-Origin', 'null');
            res.status(200).send(results.map(item => ({ id: item.id, url: item.url })));
        });
        logger.info(`Accessing /hats by method:  ${req.method}`);
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(500).next(err).send(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }

});

app.get('/hats/:id', function(req, res) {
    try {
    connection.query('SELECT * FROM tbhats WHERE id =' + req.params.id, function (error, results) {
  
        if (error) { 
            throw error
        };

      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, url: item.url })));
    });

    logger.info(`Accessing /hats by method:  ${req.method}  |  Requesting the data with id:  ${req.params.id}`);
    
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});


app.get('/glasses', function(req, res) {
    try {
        connection.query('SELECT * FROM tbglasses', function (error, results) {
        
            if (error) { 
                throw error
            };
            res.setHeader('Access-Control-Allow-Origin', 'null');
            res.status(200).send(results.map(item => ({ id: item.id, url: item.url })));
        });
        logger.info(`Accessing /glasses by method:  ${req.method}`);
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(500).next(err).send(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

app.get('/glasses/:id', function(req, res) {
    try {
    connection.query('SELECT * FROM tbglasses WHERE id =' + req.params.id, function (error, results) {
  
        if (error) { 
            throw error
        };

      res.setHeader('Access-Control-Allow-Origin', 'null');
      res.status(200).send(results.map(item => ({ id: item.id, url: item.url })));
    });

    logger.info(`Accessing /glasses by method:  ${req.method}  |  Requesting the data with id:  ${req.params.id}`);
    
    } catch (err) {
        res.status(500).send('Internal Server Error!');
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});



app.listen(9001, '0.0.0.0', function() {
    logger.info(`Server started and running on http://localhost:9001`);
    console.log('Listening on port 9001');
})