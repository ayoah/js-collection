var express   = require('express'),
    router    = express.Router(),
    kafka     = require('kafka-node'),
    Producer  = kafka.Producer,
    client    = new kafka.Client(),
    producer  = new Producer(client);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'man' });
});

/* GET collection info  */
router.get('/a.gif', function(req, res, next) {
  producer.send([{ topic: 'test-js-collection', messages: JSON.stringify(req.query) }], function (err, data) {
    console.log(data);
  });
  res.append("Content-type", "image/gif")
  res.send("")
});

module.exports = router;
