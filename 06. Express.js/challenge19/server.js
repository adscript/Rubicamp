const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const datajson = fs.readFileSync('./data.json');
let data = JSON.parse(datajson);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('list', { data }))
app.get('/add', (req, res) => res.render('add'))
app.get('/edit', (req, res) => res.render('edit'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.render('list', { data }))

app.post('/add', (req, res) => {
    data.push({ string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.bool })
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const edited = { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.bool };
    data.splice(id, 1, edited);
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
})


app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    data.splice(id, 1);
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: {...data[id]}, id });
})


app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}!`)
})
