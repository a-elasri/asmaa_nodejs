const { Article } = require('../models')
const models = require('../models')
module.exports = {
    getAllArticles() {
    return Article.findAll()
    },
    // méthodes à implémenter
    getArticles(offset = 0, limit = 10) { 
        return Article.findAndCountAll({
            limit: limit,
            offset: offset,
   //         where: {}, // conditions
          })
    },
    getArticle(id) {
        return Article.findOne({
            where:{
                id:id
            }
        })
     },
    addArticle(article) {
        return Article.create(article)
     },
    updateArticle(article) { 
       return Article.update(
        article,
          {
              where:{
                  id:article.id
              }
          }
        )
    },
    deleteArticle(id) { 
        return Article.destroy({
            where:{
                id:id
            }
          })
    },
  
    getArticleWithComments(id){
      return Article.findOne({
          where:{
              id
          },
          include:models.Comment

      })
    }
    }