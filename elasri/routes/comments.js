var express = require('express');
var router = express.Router();
const commentsRepo = require('../repositories/comments');


router.get('/', async function(req, res, next) {
  res.send(await  commentsRepo.getAllComment())
});

router.delete('/:id',async function(req,res,next){

  const id = req.params.id
  res.send( await commentsRepo.deleteComment(id))
 
})

router.put('/',async function(req,res,next){

  const comment = req.body
  res.send(await commentsRepo.updateComment(comment))

})

router.post('/',async function(req,res,next){
  
  const comment = req.body
  res.send(await commentsRepo.addComment(comment))

})

router.get('/:id', async function(req, res, next) {
    res.send(await commentsRepo.getComment(req.params.id))
})

module.exports = router;