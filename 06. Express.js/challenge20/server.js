const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
const dbFile = __dirname + "/data.db";
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

    //FILTER

    let arrKondisi = [parseInt(req.query.valueID), req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool];
    let arrIsChecked = [req.query.isID, req.query.isString, req.query.isInt, req.query.isFloat, req.query.isBool];
    let arrField = ["id = ?","instr(string,?)","integer = ?","float = ?","bool = ?","date"];

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
    let sql = "SELECT count(*) FROM databaru";
    let filter = false;
    if(activeFilter.length > 0){
        sql += " WHERE";
        filter = true;
        for(let i = 0; i < activeIndex.length; i++){
            if (activeIndex[i] != 5){
                sql += ` ${arrField[activeIndex[i]]}`;
            } else {
                if(req.query.end)
                    sql += ` ${arrField[activeIndex[i]]} BETWEEN ? AND ?`;
                else
                    sql += ` ${arrField[activeIndex[i]]} >= ?`;
            }
            if(i < activeIndex.length - 1)
                sql += ` AND`;
        }
    }

    const currpage = Number(req.query.page) || 1;
    const limit = 3;
    const lastquery = req.query;
    db.all(sql, activeFilter, (err, count) => {
        const allpage = count[0]['count(*)'];
        const pages = Math.ceil( allpage / limit);
        const offset = (currpage - 1) * limit;

        sql = sql.replace("count(*)","*");
        sql += ` LIMIT ${limit} OFFSET ${offset}`;

        db.all(sql, activeFilter, (err,rows)=>{
            if(err) return err;
            res.render('list',{
                data: rows,
                query: lastquery,
                current: currpage,
                pages: pages,
                url : req.url
            })
        });
    
    });
});


app.get('/add', (req, res) => res.render('add'))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/add', (req, res) => {
    let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool];
    let sql = `INSERT INTO databaru (string, integer, float, date, bool) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, ins, (err) => {
        if (err) throw err;
    });
    res.redirect('/');
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool, id];
    let sql = `UPDATE databaru SET string = ? , integer = ? , float = ?, date = ?, bool = ? WHERE id = ? `;
    db.run(sql, ins, (err) => {
        if (err) throw err;
    });
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    let sql = `DELETE FROM databaru WHERE id = ?`
    db.get(sql, [id], (err, row) => {
        if (err) throw err;
        res.redirect('/');
    });
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM databaru WHERE id = ?`;
    let data = [];
    db.get(sql, [id], (err, row) => {
        if (err) throw err;
        data.push({ id: `${row.id}`, string: `${row.string}`, integer: `${row.integer}`, float: `${row.float}`, date: `${row.date}`, bool: `${row.bool}` });
        res.render('edit', { item: { ...data[0] } });
    });
});

app.listen(8080, () => {
    console.log(`Example app listening on port 8080!`)
})