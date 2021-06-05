const express = require('express');
require("dotenv").config({ path: "/.config.env" }) 
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

app.use(cors())

const User = require('./models/user')

const mongoose = require('mongoose')
const url = 'mongodb://cluster0-shard-00-01.krp9o.mongodb.net:27017/btb-users'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
var jsonParser = bodyParser.json()

app.get('/login', async (req, res) => {
    const {email, password} = req.query;
    console.log(email,password)
    const userData = await User.findOne({email: email, password: password})
    console.log('userData',userData)
    if(userData === null) {
        res.statusCode = 401;
        res.send('user or password incorrect');
    } else {
        const token = Date.now()
        userData.token = token;
        await User.updateOne({id:userData.id}, { $set: {last_login:token, token: token}})
        res.send({userData})
    }
});

app.put('/details', jsonParser,  async (req, res) => {
    const body = req.body;
    const savedUserData = await User.findOne({token: body.token});
    if (savedUserData) {
        User.updateOne({token: body.token}, body, () => {res.send('data saved')})
    }
})


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server ready'));

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const a = new User ({
    first_name: 'א',
    last_name: 'ישראלי',
    id: 11111111,
    email: "1@test.com",
    phone: 11111111,
    date_of_birth: new Date('1990-12-17'),
    company_name: "aCompany",
    business_number: 11111111,
    own: 50, 
    bank_account: [{
        bank_name: "הפועלים",
        branch: 678,
        account: 9097657,
    }],
    password: 11111111,  
    last_login: new Date('2019-12-17'),
  })
const b = new User ({
    first_name: 'יעל',
    last_name: 'לוי',
    id: 22222222,
    email: "2@test.com",
    phone: 054678763,
    date_of_birth: new Date('1985-09-17'),
    company_name: "וטרינרים בשרון",
    business_number: 22222222,
    own: 50, 
    bank_account: [{
        bank_name: "לאומי",
        branch: 867,
        account: 7856467,
    }],
    password: 22222222,  
    last_login: new Date('2019-12-17'),
  })
const c = new User ({
    first_name: 'יובל',
    last_name: 'חזן',
    id: 33333333,
    email: "3@test.com",
    phone: 0547645798,
    date_of_birth: new Date('1979-02-11'),
    company_name: "בנקאות אישית",
    business_number: 33333333,
    own: 50, 
    bank_account: [{
        bank_name: "דיסקונט",
        branch: 856,
        account: 8767898,
    }],
    password: 33333333,  
    last_login: new Date('2019-12-17'),
  })
const d = new User ({
    first_name: 'דנה',
    last_name: 'רוזן',
    id: 44444444,
    email: "4@test.com",
    phone: 05068987898,
    date_of_birth: new Date('1987-03-21'),
    company_name: "מוסך בני דרור",
    business_number: 44444444,
    own: 50, 
    bank_account: [{
        bank_name: "הפועלים",
        branch: 898,
        account: 3452343,
    }],
    password: 44444444,  
    last_login: new Date('2019-12-17'),
  })

//   d.save(function (error, document) {
//     if (error) console.error(error)
//     console.log(document)
//   })

