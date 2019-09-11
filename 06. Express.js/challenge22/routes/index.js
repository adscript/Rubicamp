var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

var moment = require('moment');
moment().format();

module.exports = (db) => {
/* GET home page. */
  router.get('/', function(req, res, next) {
    let arrKondisi = [ObjectId(req.query.valueID), req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool];
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
      filter.date.$gte = req.query.start;
      if(req.query.end)
        filter.date.$lte = req.query.end;
    }
    collection = db.collection("databaru");
    //START PAGINATION
    const limit = 3;
    const currpage = Number(req.query.page) || 1;
    console.log(filter);
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
        console.log(result);
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

    // collection.find(filter).countDocuments(count => {
    //   const pages = Math.ceil(count/limit);
    //   const offset = (currpage - 1) * limit;
    //   collection.find(filter)
    //   .limit(limit)
    //   .skip(offset)
    //   .toArray( result => {
    //     console.log(result);
    //     res.render('index',{
    //       data: result,
    //       moment,
    //       query: req.query,
    //       current: currpage,
    //       pages : pages,
    //       url : req.url
    //     })
    //   })
    // })
  });

  return router;
}
