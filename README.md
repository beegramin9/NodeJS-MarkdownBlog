## 모듈 설치

npm install

## 실행

npm run devstart

## Project Status

![Generic badge](https://img.shields.io/badge/build-passing-green.svg)

## Overview

![Markdown Blog](https://user-images.githubusercontent.com/58083434/130402852-f8f8dd81-9118-4658-ad5d-43e22f127afa.gif)

## Technology Stack

<img src="https://img.shields.io/badge/NodeJS-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Express-FF7200?style=flat-square&logo=Express&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/EJS-5522FA?style=flat-square&logo=/e/&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/></a>&nbsp;

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

```html
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
    <%- body %>
  </body>
</html>
```

- Scss <br>
  > (/public/scss/\*.scss) <br> > <br>

```js

```
