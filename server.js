const express = require('express');

const app = express();
app.set('view engine', 'ejs')

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.get('/', (req,res) => {
    const articles = [{
        title : "Test Article",
        createdAt: Date.now(),
        description: "Test description"
    }]

    res.render('index', {
        articles: "articles"
    })
})

app.listen(5000, () => console.log('✅ Server up and running on 5000! 📣📢'))