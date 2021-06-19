var express = require('express');
var router = express.Router();
const tagsRepo = require('../repositories/tags');


router.get('/', async function(req, res, next) {
  res.send(await  tagsRepo.getAllTag())
});



router.delete('/:id',async function(req,res,next){ 
  
  const id = req.params.id
  res.send(await tagsRepo.deleteTag(id))

})

router.put('/',async function(req,res,next){

  const tag = req.body
  res.send(await tagsRepo.updateTag(tag))

})

router.post('/',async function(req,res,next){

  const tag = req.body
  res.send(await tagsRepo.addTag(tag))
 
})

router.get('/:id', async function(req, res, next) {
    res.send(await tagsRepo.getTag(req.params.id))
})

module.exports = router; 