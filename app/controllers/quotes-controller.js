const Quote = require('../models/quote');

const QuotesController = {
  create: (req, res) => {
    const quote = new Quote(req.body);

    if (req.body.message) {
      quote.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully created a quote');
          res.status(201).send({ quote }).end();
        }
      });
    } else {
      console.log('Message can not be empty!');
    }
  },

  update: (req, res) => {
      Quote.findByIdAndUpdate(req.params.id, {$set: {message: req.body.message, author: req.body.author}}, {new: true}, function(err, quote){
        if(err){
          console.log(err);
          
        }else{
          console.log('Successfully updated a quote');
          res.status(201).send({ quote }).end();
        }
      });
  },

  show: (req, res) => {
    Quote.findOne({ _id: req.params.id }, (err, quote) => {
      if (err) {
        return res.status(404).send({ message: 'Invalid ID' }).end();
      }

      res.send({
        data: {
          message: quote.message,
          author: quote.author
        }
      });
    });
  },

  list: (req, res) => {
    Quote.find({}, (err, quotes) => {
      if (err) {
        return res.status(500).send({ message: 'Internal Server Error' });
      }

      res.send({ data: quotes });
    });
  }
};

module.exports = QuotesController;
