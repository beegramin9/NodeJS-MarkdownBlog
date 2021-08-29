const express = require('express');
const router = express.Router();


router.get('/new', (req,res) => {
    res.render('articles/new')
})

router.post('/', (req,res) => {
    //  Save the articles into the database
})


module.exports = router