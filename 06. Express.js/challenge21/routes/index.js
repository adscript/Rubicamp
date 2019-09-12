var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
let moment = require('moment');

  const pool = new Pool({
      user: 'adminan',
      host: 'localhost',
      database: 'data',
      password: 'root',
      port: 5432
    });

moment().format();

/* GET home page. */
router.get('/', function(req, res, next) {
  //FILTER

  let arrKondisi = [parseInt(req.query.valueID), req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool];
  let arrIsChecked = [req.query.isID, req.query.isString, req.query.isInt, req.query.isFloat, req.query.isBool];
  let arrField = ["id = $","position( $ in string) > 0 ","integer = $","float = $","bool = $","date"];

  let activeFilter = [];
  let activeIndex = [];
  for(const key in arrKondisi){
      if (arrIsChecked[key] && arrKondisi[key]){
          activeFilter.push(arrKondisi[key]);
          activeIndex.push(Number(key));
      }
  }

  if(req.query.isDate && req.query.start){
      activeFilter.push(`${req.query.start}`);
      if(req.query.end)
          activeFilter.push(`${req.query.end}`);
      activeIndex.push(5);
  }
  
  //COUNT DATA WITH FILTER
  let sql = "SELECT COUNT(*) FROM databaru";
  if(activeFilter.length > 0){
      sql += " WHERE";
      for(let i = 0; i < activeIndex.length; i++){
          if (activeIndex[i] != 5){
              sql += ` ${arrField[activeIndex[i]].replace("$","$"+Number(i+1))}`;
          } else {
              if(req.query.end)
                  sql += ` ${arrField[activeIndex[i]]} BETWEEN $${i+1} AND $${i+2}`;
              else
                  sql += ` ${arrField[activeIndex[i]]} >= $${i+1}`;
          }
          if(i < activeIndex.length - 1)
              sql += ` AND`;
      }
  }

  const currpage = Number(req.query.page) || 1;
  const limit = 1;
  const lastquery = req.query;
  
  pool.query(sql, activeFilter, (err, count) => {
      const allpage = Number(count.rows[0]["count"]);
      const pages = Math.ceil( allpage / limit);
      const offset = (currpage - 1) * limit;

      sql = sql.replace("COUNT(*)","*");
      sql += ` LIMIT ${limit} OFFSET ${offset}`;
      pool.query(sql, activeFilter, (err,data)=>{
          if(err) return err;
          res.render('list',{
              data: data["rows"],
              moment,
              query: lastquery,
              current: currpage,
              pages: pages,
              url : req.url
          })
      });
  
  });
});

router.get('/add', (req, res) => res.render('add'));


router.post('/add', (req, res) => {
  let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool];
  let sql = `INSERT INTO databaru (string, integer, float, date, bool) VALUES ($1, $2, $3, $4, $5)`;
  pool.query(sql, ins, (err) => {
      if (err) throw err;
      res.redirect('/');
  });
})

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool, id];
  let sql = `UPDATE databaru SET string = $1 , integer = $2 , float = $3, date = $4, bool = $5 WHERE id = $6 `;
  pool.query(sql, ins, (err) => {
      if (err) throw err;
      res.redirect('/');
  });
})

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM databaru WHERE id = $1`
  pool.query(sql, [id], (err, row) => {
      if (err) throw err;
      res.redirect('/');
  });
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  let sql = `SELECT * FROM databaru WHERE id = $1`;
  let data = [];
  pool.query(sql, [id], (err, result) => {
      if (err) throw err;
      console.log(result.rows[0].id);
      row = result.rows[0];
      data.push({ id: `${row.id}`, string: `${row.string}`, integer: `${row.integer}`, float: `${row.float}`, date: `${row.date}`, bool: `${row.bool}` });
      res.render('edit', { item: { ...data[0] } });
  });
});

module.exports = router;
