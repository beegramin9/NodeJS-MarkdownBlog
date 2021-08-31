const express = require('express');

const app = express();
app.set('view engine', 'ejs')

const layout = require('express-ejs-layouts');
app.use(layout);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false})) 
// Form에서 받아오는 데이터를 해당 URL에서 req.body로 access할 수 있게 해준다
// 해당 코드는 모든 router 위에 위치해야 함

const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// Form의 action에서 ?_method=DELETE or PATCH 등 params를 주면 
// Form의 원래 Method를 Override해서 DELETE, PATCH request를 쓸 수 있다.
// 해당 코드는 모든 router 위에 위치해야 함

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

const Article = require('./models/article')


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({date: 'desc'})
    
    res.render('index', {
        articles: articles
    })
})


const articleRouter = require('./routes/articles'); 
app.use('/articles', articleRouter);
// router 이전에 선언되는 코드들이 많기 때문에
// 모든 router들을 가장 밑에 배치합니다.

app.listen(5000, () => console.log('✅ Server up and running on 5000! 📣📢'))