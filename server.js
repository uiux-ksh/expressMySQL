const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql");
const dbConfig = require("./app/config/db.config");
const app = express();
const ejs = require('ejs');
const {param} = require("express/lib/router");
const port = 3000;



const con = mysql.createConnection({
    host:dbConfig.Host,
    user:dbConfig.User,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB,
});

con.connect(function (err) {
    if(err) throw err;
    console.log('db연결 ')
});

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
//조회
app.get ('/',(req,res) => {
    const sql  = 'select * from users' ;
    con.query(sql,function (err,result,fields) {
        if(err) throw err;
        res.render('index',{users:result});
    })
})
//딜리트
app.get('/delete/:id', (req,res) => {
    const sql ='DELETE FROM users WHERE id = ?';
    con.query(sql,[req.params.id],function (err,result,fields) {
        if(err) throw  err;
        console.log(result);
        res.redirect('/')
    })
})

//수정

app.get('/edit/:id',(req,res) => {
    const sql = 'SELECT * FROM users WHERE id = ? ';
    con.query(sql,[req.params.id],function (err,result,fields) {
        if(err )throw err;
        res.render('edit',{user: result});
    })
})
app.post('/update/:id',(req,res) => {
    const sql = 'UPDATE users SET ? WHERE id = ' + req.params.id;
    con.query(sql,req.body,function (err,result,fields) {
        if(err) throw  err;
        console.log(result);
        res.redirect('/');
    })
})

app.get('/create',(req,res) =>
    res.sendFile(path.join(__dirname,'form.html')))

app.post('/',(req,res) => {
    const sql  ='INSERT INTO users SET ?';

    con.query(sql,req.body,function (err,result,fields) {
        if(err) throw err;
        console.log(result);
        res.send('등록이 완료되었습니다.')
    })
})

//포트넘버 설정

app.listen(port,() => {
    console.log('Server is running on port 3000.,')
})
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
//
// app.get("/",(req,res) => {
//     res.json({message:'Hello Word'});
// });
//

