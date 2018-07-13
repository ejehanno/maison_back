var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/maison';


router.get('/', function(req, res, next) {
    const results =[];
    pg.connect(connectionString,(err, client, done)=>{
        if(err){
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
         const query = client.query('SELECT * FROM rayon ORDER BY rayon_id ASC');

        query.on ('row', (row)=> {
            results.push(row);
        });
        query.on('end',()=>{
            done();
            return res.json(results);
        });
    });
});


module.exports = router;