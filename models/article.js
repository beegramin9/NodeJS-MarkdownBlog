const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({ // set up the column of the model
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

// anytime pre the server interacts with the model,
articleSchema.pre('validate', function (next) { // it validates with the following function. For some reason, can't use arrow function
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true, 
            strict: true // alnum이 아닌 특수문자는 알아서 삭제함
        })
    }
    next()
})

module.exports = mongoose.model("Article", articleSchema)