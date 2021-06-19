var express = require('express');
var router = express.Router();
const articlesRepo = require('../repositories/articles');
//const { authCheck } = require('./')

router.get('/', async function(req, res, next) {
  const  page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  res.send(await  articlesRepo.getArticles(offset,limit))
});



router.delete('/:id',async function(req,res,next){

  const id = req.params.id
  res.send(await articlesRepo.deleteArticle(id))

})

router.put('/', async function(req,res,next){
  const article = req.body
  res.send(await articlesRepo.updateArticle(article))
 
})

router.put('/', async function(req, res, next) {
  var article = {};
  article.user = req.user;
  article.id = req.body.id;
  article.title = req.body.title;
  article.content = req.body.content;
  article.published = req.body.published;
  res.status(200).send(await articleRepo.updateArticle(article));
});

router.post('/',async function(req,res,next){

  const article = req.body
  res.send(await articlesRepo.addArticle(article))

})

router.get('/:id', async function(req, res, next) {
    res.send(await articlesRepo.getArticle(req.params.id))
})



router.get('/:id/comments', async function(req, res, next) {
  res.send(await articlesRepo.getArticleWithComments(req.params.id))
})

module.exports = router;