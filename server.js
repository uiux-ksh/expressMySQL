const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const dbConfig = require("./app/config/db.config");
const app = express();

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
const sql = 'INSERT INTO users(name,email) VALUES(?,?)'
con.query(sql,['Jack','jack@exsample.co.jp'],function (err,result,fields) {
    if(err )throw err;
    console.log(result)
})


app.get('/',(req,res) => {
    const sql = 'select * from users'
    con.query(sql,function (err,result,fields) {
        if(err) throw  err;
        res.send(result);
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

