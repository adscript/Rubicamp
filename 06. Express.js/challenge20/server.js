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


    app.get('/', (req,res) => {
        let sql = "SELECT * FROM databaru";
        let data = [];
        db.serialize( () => {

            db.all(sql, (err, rows) => {
                if (err) throw err;
                    rows.forEach( (item) => {
                        data.push({id: `${item.id}` ,string : `${item.string}` , integer: `${item.integer}`, float: `${item.float}`, date: `${item.date}`, bool: `${item.bool}`});
                    }); 
                    res.render('list', {data})    
            });
        });
    });

    app.get('/add', (req,res) => res.render('add'))


    app.use(bodyParser.urlencoded({ extended: false}))
    app.use(bodyParser.json())
    app.get('/', (req,res) => res.render('list', {data}))

    app.post('/add', (req,res) => {
        let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool];
        let sql = `INSERT INTO databaru (string, integer, float, date, bool) VALUES (?, ?, ?, ?, ?)`;
                        db.run(sql, ins , (err) => {
                            if(err) throw err;
                        });
                        res.redirect('/');
                    })
    
    app.post('/edit/:id', (req,res) => {
        const id = req.params.id;
        let ins = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.bool, id];
        let sql = `UPDATE databaru SET string = ? , integer = ? , float = ?, date = ?, bool = ? WHERE id = ? `;
        db.run(sql, ins , (err) => {
            if(err) throw err;
        });
        res.redirect('/');
    })    
    
    app.get('/delete/:id', (req,res) => {
        const id = req.params.id;
        let sql = `DELETE FROM databaru WHERE id = ?`
        db.get(sql, [id] , (err, row) => {
            if (err) throw err;
            res.redirect('/');
        });
    })
    
    app.get('/edit/:id', (req,res) => {
        const id = req.params.id;
        let sql = `SELECT * FROM databaru WHERE id = ?`;
        let data = [];
            db.get(sql, [id] , (err, row) => {
                if (err) throw err;
                data.push({id : `${row.id}`, string : `${row.string}` , integer: `${row.integer}`, float: `${row.float}`, date: `${row.date}`, bool: `${row.bool}`});
                res.render('edit', {item: {...data[0]}}); 
            });
    });
    

    app.listen(8080, () => {
        console.log(`Example app listening on port 8080!`)
    })