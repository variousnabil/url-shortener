const express = require('express');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 8000;

require('dotenv').config();

// mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    app.listen(port);
    app.use(bodyParser.json());

    const Schema = mongoose.Schema;
    const shorturlSchema = new Schema({
        original_url: String,
        short_url: String
    });
    const ShortURL = mongoose.model('short_url', shorturlSchema);

    app.post('/api/shorturl/new', (req, res) => {
        const randomString = Math.random().toString(36).substr(2, 10);
        const original_url = req.body.original_url;
        dns.lookup(original_url, (err, address, family) => {
            if (err) return res.json({ "error": "invalid URL" });
            // send short_url and original_url to mongo atlas
            const newShorturl = new ShortURL({
                original_url: original_url,
                short_url: randomString
            });
            newShorturl.save((err, data) => {
                if (err) return res.json({ err });
                res.json({
                    original_url: data.original_url,
                    short_url: data.short_url
                });
            });
        });
    });

    app.get('/api/shorturl/:short_url', (req, res) => {
        const short_url = req.params.short_url;
        ShortURL.findOne({ short_url }, (err, data) => {
            if (err) return res.json({ error: 'invalid URL' });
            res.redirect('https://' + data.original_url);
        });
    });

});



