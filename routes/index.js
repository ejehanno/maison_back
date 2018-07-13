var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/maison';

/* GET home page. */
router.get('/f', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/currentListe', function(req, res, next) {
    console.log("liste");
    var results=null;
    pg.connect(connectionString,(err, client, done)=>{
        if(err){
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        const query = client.query('SELECT * FROM course WHERE current = true ORDER BY course_id ASC');

        query.on ('row', (row)=> {
            results = row;
        });
        query.on('end',()=>{
            done();
            return res.json(results);
        });
    });
});


module.exports = router;
