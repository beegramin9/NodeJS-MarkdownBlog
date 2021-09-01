const mongoose = require('mongoose');
const marked = require('marked'); // converts markdown to HTML
const slugify = require('slugify');
const createDomPurify = require('dompurify') // XXS공격 보안
const { JSDOM } = require('jsdom'); // nodejs는 html이 어떻게 작동하는지 모르기 때문에 따로 설치해서 알려줘야 함
const dompurify = createDomPurify(new JSDOM().window) // Creates HTML, purify with JSDOM().window

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
    },
    sanitizedHtml: {
        type: String,
        required: true
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
    // 한글이 들어오면 안된다.

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize( marked(this.markdown) )
    }
    next()
})

module.exports = mongoose.model("Article", articleSchema)