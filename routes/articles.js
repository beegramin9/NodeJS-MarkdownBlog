const express = require('express');
const router = express.Router();

const Article = require('../models/article');


router.get('/new', (req,res) => {
    // 새로운 article 쓸 때 기본값이 모두 비어있는 article을 전달해야
    // views/aritcles/_form_fields.ejs에서 에러가 발생하지 않는다.
    res.render('articles/new', {article: new Article()})
})

router.get('/:slug', async (req,res) => {
    const article = await Article.findOne( {slug: req.params.slug} );
    if (!article) res.redirect('/'); 
    res.render('articles/show', {article: article})
})

router.post('/', async (req,res) => {
    //  Save the articles into the database
    const currentlyWritingArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    
    try {
        const newlySavedArticle = await currentlyWritingArticle.save();
        res.redirect(`/articles/${newlySavedArticle.slug}`)
    } catch (e) {
        // required field가 빠져서 에러가 발생했을 때, 
        console.log(e);
        res.render('articles/new', {article: currentlyWritingArticle})
    }
})

//! link는 get, Form은 get/post 요청만 지원한다
// 호서에서는 delete라는 url을 만들어서 로직을 썼지만
// 

router.delete('/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router