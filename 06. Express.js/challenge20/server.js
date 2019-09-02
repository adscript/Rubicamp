const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()
const dbFile = __dirname + "/data.db";
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/:page', (req, res) => {
    let sql = "SELECT * FROM databaru ORDER BY id ASC LIMIT 3 OFFSET 0";
    let data = [];
    db.serialize(() => {
        db.all(sql, (err, rows) => {
            if (err) throw err;
            rows.forEach((item) => {
                data.push({ id: `${item.id}`, string: `${item.string}`, integer: `${item.integer}`, float: `${item.float}`, date: `${item.date}`, bool: `${item.bool}` });
            });
            res.render('list', { data })
        });
    });
});

app.get('/', (req, res) => {

    //FILTER

    let arrKondisi = [req.query.valueID, req.query.valueString, parseInt(req.query.valueInt), parseFloat(req.query.valueFloat), req.query.valueBool];
    let arrIsChecked = [req.query.isID, req.query.isString, req.query.isInt, req.query.isFloat, req.query.isBool];
    let arrField = ["id","string","integer","float","bool","date"];

    let activeFilter = [];
    let activeIndex = [];
    for(const key in arrKondisi){
        if (arrIsChecked[key] && arrKondisi[key]){
            activeFilter.push(arrKondisi[key]);
            activeIndex.push(key);
        }
    }

    if(req.query.isDate && req.query.start){
        if(req.query.end)
            dateFilter = 2;
        else 
            dateFilter = 1;
        activeIndex.push('5');
    } else
        dateFilter = 0;

    console.log("new " );
    console.log(activeFilter);
    console.log(dateFilter);


    const currPage = Number(req.query.page) || 1;
    const limitpage = 3;
    const lastquery = req.query;

    db.all(sql,activeFilter,(err, count) => {
        
    })


    
    let kondisi = [`id ${req.query.valueID != "" ? ` = ${req.query.valueID}` : ` != NULL`}`,
    `instr(string, "${req.query.valueString}") > 0`,
    `integer ${req.query.valueInt != "" ? ` = ${req.query.valueInt}` : ` != NULL`}`,
    `float ${req.query.valueFloat != "" ? ` = ${req.query.valueFloat}` : ` != NULL`}`,
    `bool ${req.query.valueBool != "" ? ` = "${req.query.valueBool}"` : ` != NULL`}`];

    let status = ['isID', 'isString', 'isInt', 'isFloat', 'isBool'];
    let i = 0; firstKon = true;
    for (const key in req.query) {
        if (key == status[i]) {
            if (req.query[key].length > 1) {
                if (firstKon) {
                    sql += ` WHERE ${kondisi[i]}`;
                    firstKon = false;
                }
                else
                    sql += ` AND ${kondisi[i]}`;
            }
            i++;
        }
    }

    if (req.query.isDate != undefined) {
        if (req.query.start <= req.query.end && req.query.isDate.length > 1) {
            if (firstKon)
                sql += ` WHERE`;
            else
                sql += ` AND`;
            if (req.query.end)
                sql += ` date BETWEEN "${req.query.start}" AND "${req.query.end}"`;
            else
                sql += ` date BETWEEN "${req.query.start}" AND "${req.query.start}"`;
        }
    }

    sql = sql + ` ORDER BY id ASC LIMIT 3 OFFSET 0`;
    console.log(sql);

    let data = [];
    db.serialize(() => {
        db.all(sql, (err, rows) => {
            if (err) throw err;
            rows.forEach((item) => {
                data.push({ id: `${item.id}`, string: `${item.string}`, integer: `${item.integer}`, float: `${item.float}`, date: `${item.date}`, bool: `${item.bool}` });
            });
            res.render('list', { data })
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