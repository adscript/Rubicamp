const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

fs.readFile("data.json", (err, list) => {
    if(err) 
        throw err;
    let data = JSON.parse(list);

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.get('/', (req,res) => res.render('list', {data}))
    app.get('/add', (req,res) => res.render('add'))
    app.get('/edit', (req,res) => res.render('edit'))

    app.use(bodyParser.urlencoded({ extended: false}))
    app.use(bodyParser.json())
    app.get('/', (req,res) => res.render('list', {data}))

    app.post('/add', (req,res) => {
        data.push({string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.bool})
        let datajson = JSON.stringify(data);
        fs.writeFile("data.json",datajson,(err)=>{
            if(err)
              throw err;
              res.redirect('/');
          });
        
    })
    
    app.post('/edit/:id', (req,res) => {
        const id = req.params.id;
        const edited = {string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.bool};
        data.splice(id,1,edited);
        datajson = JSON.stringify(data);
        fs.writeFile("data.json",datajson,(err)=>{
            if(err)
              throw err;
              res.redirect('/');
          });
    })
    
    
    app.get('/delete/:id', (req,res) => {
        let id = req.params.id;
        data.splice(id,1);
        datajson = JSON.stringify(data);
        fs.writeFile("data.json",datajson,(err)=>{
            if(err)
              throw err;
              res.redirect('/');
          });
    })
    
    app.get('/edit/:id', (req,res) => {
        const id = req.params.id;
        console.log(data[id], id);
        res.render('edit', {data: data[id], id});
    })
    

    app.listen(3000, () => {
        console.log(`Example app listening on port ${3000}!`)
    })
});







