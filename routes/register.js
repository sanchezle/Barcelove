const express = require('express');
const app = express();
const router = express.Router();


// GET method route
router.get('/', function (req, res) {
    res.send(__dirname + "templates/index.html"_);
    });

// POST method route
router.post('/', function (req, res) {
    res.send('POST request to the homepage');
    });

// PUT method route
router.put('/', function (req, res) {
    res.send('PUT request to the homepage');
    }
);

// DELETE method route
router.delete('/', function (req, res) {
    res.send('DELETE request to the homepage');
    }
);
