const { Tag } = require('../models')
module.exports = {
    getAllTag() {
    return Tag.findAll()
    },
    getTag(id) {
        return Tag.findOne({
            where:{
                id:id
            }
        })
     },
    addTag(tag) {
        return Tag.create(tag)
     },
    updateTag(tag) { 
       return Tag.update(
        tag,
          {
              where:{
                  id:tag.id
              }
          }
        )
    },
    deleteTag(id) { 
        return Tag.destroy({
            where:{
                id:id
            }
          })
    },
    }