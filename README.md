## 모듈 설치

npm install

## 실행

npm run devstart

## Project Status

![Generic badge](https://img.shields.io/badge/build-passing-green.svg)

## Overview

![Nodejsblog](https://user-images.githubusercontent.com/58083434/131614536-9bfe7a4e-377b-4db7-b807-e8bf99cbe23a.gif)

## Technology Stack

<img src="https://img.shields.io/badge/NodeJS-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Express-FF7200?style=flat-square&logo=Express&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/EJS-5522FA?style=flat-square&logo=/e/&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Scss-CC6699?style=flat-square&logo=Sass&logoColor=white"/></a>&nbsp;

## Outline

&nbsp; This web is a simple Markdown blog that fully supports CRUD interactions. This is built with NodeJS Express, MongoDB, EJS and Scss.
<br/><br/>
&nbsp; CRUD 기능이 완벽하게 구현된 마크다운 블로그입니다.

```js
{서버 : NodeJS Express,
데이터베이스 : MongoDB,
view engine : EJS,
css 전처리기 : Scss}
```

을 사용했습니다. <br/>
MVC패턴을 따릅니다. 각각 model, views, routes(=controller) 폴더에서 확인할 수 있습니다.

## Main Feature Code

- EJS Layout<br>
  > (/views/layout.ejs) <br>
  > EJS Layout은 NodeJS의 native module이 아니기 때문에 따로 설치해야 합니다. <br>
  > npm i express-ejs-layouts <br>

```ejs
// 반복되는 Html요소 or building-block component들을 배치할 수 있습니다.
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/css/style.css" rel="stylesheet" type="text/css" />
    <title>Markdown Blog</title>
  </head>
  <body>
    <%- body %> <!-- React에서 Layout.js(or whatever you named it) 컴포넌트을 사용해보셨다면, {children}과 같은 역할임을 쉽게 알 수 있습니다. -->
  </body>
</html>
```

> 다른 ejs파일에서는 layout.ejs의 header를 포함한 html boiler plate를 생략할 수 있습니다. <br>

> (/views/artilces/\_form_fields.ejs) <br>

```ejs
<div class="form-group">
    <label for="title">Title</label>
    <input required value="<%= article.title %>" type="text" name="title" id="title">
</div>
<div class="form-group">
    <label for="description">Description</label>
    <textarea name="description" id="description"><%= article.description %> </textarea>
</div>
<div class="form-group">
    <label for="markdown">Markdown</label>
    <textarea required name="markdown" id="markdown"><%= article.markdown %></textarea>
</div>

<a href="/">Cancel</a>
<button type="submit">Save</button>
```

- Scss <br>
  > (/public/scss/\*.scss) <br>
  > npm i -g sass <br>
  > sass --watch public/scss:public:css<br>

> Public 폴더를 사용하기 위해 미들웨어가 필요합니다.

```js
app.use(express.static(__dirname + "/public"));
```

> sass --watch public/scss(변환 전 scss폴더):public:css(변환 후 css폴더)로 실시간으로 scss 파일을 css로 변환할 수 있습니다.

```scss
.mainpagewrapper {
  h1 {
    color: red;
  }

  a {
    color: green;
  }
}

.blogcardwrapper {
}

.blogcard {
}
```

- article Model<br>
  > (/models/article.js) <br>
  > mongoose 객체의 Schema()메소드는 article(=블로그 포스트)모델의 column들을 정의할 수 있습니다. <br>

```js
const articleSchema = new mongoose.Schema({
  // set up the column of the model
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});
```

- Method Overriding<br>
  > (/server.js)
  > url은 get 요청, form의 action은 get/post 요청만 지원합니다. <br>
  > 이외의 요청은 nodejs에서는 native가 아니다 미들웨어를 설치해서 사용해야 합니다.

```js
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// Form의 action에서 ?_method=DELETE or PATCH 등 params를 주면
// Form의 원래 Method를 Override해서 DELETE, PATCH request를 쓸 수 있다.
// 해당 코드는 모든 router 위에 위치해야 함
```

> (/views/index.ejs)

```ejs
<form action="/articles/<%= article.id %>?_method=DELETE" method="POST">
    <button type="submit">Delete</button>
</form>
```
