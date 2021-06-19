const { User } = require('../models')
const {Article} = require('../models')
module.exports = {
    async getAllUsers() {
    return await User.findAll()
    },
    // méthodes à implémenter
    async getUsers(offset = 0, limit = 10) { 
        return await User.findAndCountAll({
            limit: limit,
            offset: offset,
            order:[ ['createdAt', 'DESC'] ], // conditions
          })
    },
    async getAdmins() { 
        return await User.findAll({
            where:{
                role:"admin"
            }
        })
    },
    async getAuthors() { 
        return await User.findAll({
            where:{
                role:"author"
            }
        })
    },
    async getGuests(){ 
        return await User.findAll({
            where:{
                role:"guest"
            }
        })
    },
    async getUser(id) {
        return await User.findOne({
            where:{
                id:id
            }
        })
     },
    async getUserByEmail(email) {
        return await User.findOne({
            where:{
                email:email
            }
        })
     },
     async addUser(user) {
        return await User.create(user)
     },
      updateUser(user) { 
       return  User.update(
            user,
          {
              where:{
                  id:user.id
              }
          }
        )
    },
     deleteUser(id) { 
        return  User.destroy({
            where:{
                id:id
            }
          })
    },
     findUserArticles(id){
        return  User.findOne({
            where:{
                id:id
            },
            include:Article
        })
    }
    }