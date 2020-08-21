const express = require('express');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');

const port = 8000;

app.listen(port);
app.use(bodyParser.json());

app.get('/dnslookup/:url', (req, res) => {
    const url = req.params.url;
    dns.lookup(url, (err, address, family) => {
        if (err) return res.json({ isValid: false, err });
        res.json({ isValid: true, address, family: 'IPv' + family });
    });
});

app.get('/redirect', (req, res) => {
    res.redirect('http://github.com/variousnabil');
});

app.post('/api/shorturl/new', (req, res) => {
    const randomString = Math.random().toString(36).substr(2, 10);
    const url = `${req.protocol}://${req.hostname}:${port}/`;
    res.json({
        original_url: req.body.original_url,
        short_url: `${url}${randomString}`
    });
});