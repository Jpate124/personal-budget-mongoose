 // Budget API

 const express = require('express');
 const mongoose = require("mongoose")
 const cors = require('cors');
 const budgetModel = require("./models/budget_schema")
 const bodyParser = require("body-parser")
 const app = express();

 app.use(cors());
 app.use(bodyParser.urlencoded({ extended: true}))
 app.use(bodyParser.json())
 
 const port = 3001;

let url = 'mongodb://localhost:27017/personal-budget-database';

app.get('/budget', (req, res) => {

    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
               .then(() => {
                    
                    budgetModel.find({})
                                .then((data) => {
                                    console.log('Found budget');
                                    res.json(data)
                                    mongoose.connection.close(() => console.log('connection closed'));
                                })
                                .catch(err => {
                                    console.log('error finding budget', err);
                                })

                .catch(err => {

                    console.log('error connecting to mongodb', err);
                
                });
    });
})

app.post('/budget/add', (req, res) => {
  
    console.log(req.body);  
    mongoose.connect(url)
               .then(() => {

                   let budget = new budgetModel(req.body)
             
                    budgetModel.insertMany(budget)
                                .then(doc => {
                                    console.log('budget inserted', doc);
                                    res.send("budget added")
                                    mongoose.connection.close(() => console.log('connection closed'));          
                                })
                                .catch(err => { 
                                    console.log('error inserting budget', err);
                                });

                })
                .catch(err => { 
                    
                    console.log('error connecting to mongodb', err);
                
                });
  
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});