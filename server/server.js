const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Quote } = require('./models/quote');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/quotes', (req,res) => {
    var quote = new Quote({
        content: req.body.content,
        author: req.body.author
    });

quote.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/quotes', (req,res) => {
    Quote.find().then((quotes) => {
        res.send({
            quotes
        })
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/quotes/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Quote.findById(id).then((quote) => {
        if(!quote){
            return res.status(404).send();
        } 

        res.send(quote)
    }).catch ((e) => {
        res.status(400).send(e);
    });
})

app.get('/rand', (req,res) => {
    Quote.count().exec((e, count) => {
        var random = Math.floor(Math.random() * count)

        Quote.findOne().skip(random).exec((e,quote) => {
            res.send({
                quote
            })
        });
    });
})

app.delete('/quotes/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Quote.findByIdAndRemove(id).then((quote) => {
        if(!quote){
            return res.status(404).send();
        } 

        res.send(quote)
    }).catch ((e) => {
        res.status(400).send(e);
    });
})

app.patch('/quotes/:id', (req,res) => {
    var id = req.params.id;
    var body =_.pick(req.body,['content','author']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Quote.findByIdAndUpdate(id, {$set:body}, {new: true}).then((quote) => {
        if(!quote){
            return res.status(404).send();
        }

        res.send(quote)
    }).catch ((e) => {
        res.status(400).send(e);
    });    
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app};