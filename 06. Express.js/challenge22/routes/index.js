var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

var moment = require('moment');
moment().format();

module.exports = (db) => {
/* GET home page. */
  router.get('/', function(req, res, next) {
    let arrKondisi = [ObjectId(req.query.valueID), req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool == 'true' ? true : false];
    let arrIsChecked = [req.query.isID, req.query.isString, req.query.isInt, req.query.isFloat, req.query.isBool];
    
    // let arrKondisi = [1, "coba", 2, 2.02, true];
    // let arrIsChecked = [1, 1, 1, 1, 1, 1];

    let filter = {};
    let activeIndex = [];
    let tname = ['_id','string','integer','float','bool','date']

    for(const key in arrKondisi){
      if (arrIsChecked[key] && arrKondisi[key]){
          filter[tname[key]] = arrKondisi[key];
          activeIndex.push(Number(key));
      }
    }
    if(req.query.start && req.query.isDate){
      filter.date = {}
      filter.date.$gte = new Date(`${req.query.start}T00:00:00.000Z`);
      if(req.query.end)
        filter.date.$lte = new Date(`${req.query.end}T00:00:00.000Z`);
    }
    console.log(filter);
    collection = db.collection("databaru");

    //START PAGINATION
    const limit = 3;
    const currpage = Number(req.query.page) || 1;
    url = req.query == '/' ? "?page=1" : req.query;
    collection.countDocuments(filter)
    .then(count => {
      const pages = Math.ceil(count/limit);
      const offset = (currpage - 1) * limit;
      collection.find(filter)
      .limit(limit)
      .skip(offset)
      .toArray()
      .then(result => {
        res.render('index',{
                data: result,
                moment,
                query: req.query,
                current: currpage,
                pages : pages,
                url
          })
      }) 
    })
  });

  router.get('/add', (req, res) => res.render('add'));

  router.post('/add',(req,res) => {
    let insertValue = {"string": req.body.string, "integer": parseInt(req.body.integer), "float": parseFloat(req.body.float), "date": new Date(`${req.body.date}T00:00:00.000Z`), "bool": req.body.bool == 'true' ? true : false}
    console.log(insertValue);
    
    db.collection("databaru")
    .insertOne(insertValue)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
  })

  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.collection("databaru")
    .deleteOne({_id : ObjectId(id)})
    .then(result => {
      res.redirect('/');
    })
  })

  router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.collection("databaru")
    .find({_id : ObjectId(id)})
    .toArray()
    .then(result => {
      res.render('edit', { item : result[0], moment});
    })
  })

  router.post('/edit/:id', (req,res) => {
    const id = ObjectId(req.params.id);
    const condition = { "string": req.body.string, "integer": parseInt(req.body.integer), "float": parseFloat(req.body.float), "date": new Date(`${req.body.date}T00:00:00.000Z`), "bool": req.body.bool == 'true' ? true : false}
    console.log(condition);
    
    db.collection("databaru")
    .updateOne({_id : id}, {$set: condition})
    .then(result => {
      res.redirect('/');
    })
  })

  return router;
}
