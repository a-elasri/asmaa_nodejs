'use strict';
const faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [];
     const roles = ['admin','author','guest']
     const tagData = []
     const articleData = [] 
     const articleTagsData = []
     const commentData = []

     for (let i = 0; i < 10; i++) {
       const tagDate = faker.date.between(new Date(2000, 1, 1, 0, 0, 0),new Date())
        const tag = {
          id:(i+1),
          name:faker.lorem.sentence(3),
          createdAt:tagDate,
          updatedAt: tagDate
        }
        tagData.push(tag)
    }
    let articleId = 1
     for (let i = 0; i < 20; i++) {
      const date = faker.date.between(new Date(2000, 1, 1, 0, 0, 0),new Date())
         const user = {
             id:(i+1),
             username: faker.internet.userName(),
             email: faker.internet.email(),
             password:faker.internet.password(),
             role:faker.helpers.randomize(roles),
             createdAt:date,
             updatedAt: date
         }
         
         for(let k = 0;k<Math.floor(Math.random() * (10 - 2) + 2);k++){
            const articleDate = faker.date.between(date,new Date())
            const article = {
              id:articleId,
              userId:(i+1),
              title:faker.lorem.sentence(),
              content:faker.lorem.paragraphs(),
              createdAt:articleDate,
              updatedAt: articleDate
            }
            
            for(let l = 1;l<=Math.floor(Math.random() * (6 - 2) + 2);l++){
              const articleTag = {
                ArticleId:articleId,
                TagId:l,
                createdAt:articleDate,
                updatedAt:articleDate
              }
              articleTagsData.push(articleTag)
            }
            for(let c = 0;c<Math.floor(Math.random() * (10));c++){
              const commentDate = faker.date.between(articleDate,new Date())
              const comment = {
                content:faker.lorem.text(),
                ArticleId:articleId,
                createdAt:commentDate,
                updatedAt:commentDate
              }
              commentData.push(comment)
            }
            articleId++
            articleData.push(article)
         }

         usersData.push(user)
        }

        
   
         await queryInterface.bulkInsert('Users', usersData);
         console.log("users inserted");
         await queryInterface.bulkInsert('Tags', tagData);
         console.log("tags inserted");
         await queryInterface.bulkInsert('Articles', articleData);
         console.log("articles inserted");
         await queryInterface.bulkInsert('ArticleTags', articleTagsData);
         console.log("articlesTags inserted");
         await queryInterface.bulkInsert('Comments', commentData);
         console.log("Comments inserted");
        },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
