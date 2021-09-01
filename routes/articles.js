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

router.post('/', async (req, res, next) => {
    req.article = new Article(); 
    next()
}, saveArticleAndRedirectTo("new"))

//! link는 get, Form은 get/post 요청만 지원한다
// 호서에서는 delete라는 url을 만들어서 로직을 썼지만
// npm i method-override 사용

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
})


router.get('/edit/:slug', async (req, res) => {
    const existingArticle = await Article.findOne( {slug: req.params.slug} );
    res.render('articles/edit', { article: existingArticle})
})

// PUT request
router.put('/:slug', async (req, res, next) => {
    req.article = await Article.findOne( {slug: req.params.slug} );
    next()
}, saveArticleAndRedirectTo("edit"))


function saveArticleAndRedirectTo(path) {
    return async (req, res) => {
        //  Save the articles into the database
        const currentlyWritingArticle = req.article
        currentlyWritingArticle.title = req.body.title
        currentlyWritingArticle.description = req.body.description
        currentlyWritingArticle.markdown = req.body.markdown
        const newlySavedArticle = await currentlyWritingArticle.save();
        try {
            res.redirect(`/articles/${newlySavedArticle.slug}`)
        } catch (e) {
            // required field가 빠져서 에러가 발생했을 때, 
            console.log(e);
            res.render(`articles/${path}`, {article: currentlyWritingArticle})
        }
    }
}

module.exports = router