const express = require('express');

const app = express();
app.set('view engine', 'ejs')

const layout = require('express-ejs-layouts');
app.use(layout);

app.use(express.static(__dirname + '/public'));

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/')


app.get('/', (req,res) => {
    const articles = [{
        title : "Test Article",
        date: new Date(),
        description: "Test description"
    }, {
        title : "Test Article2",
        date: new Date(),
        description: "Test description2"
    }]

    res.render('index', {
        articles: articles
    })
})

app.listen(5000, () => console.log('✅ Server up and running on 5000! 📣📢'))