const fetch = require("cross-fetch")
const cron = require("node-cron")

const api = require('../constants/index')

const EmailService = require("./emailServices")

const NewsArticles = require("../models/News")

const CronArticle = cron.schedule('*/05 * * * * *', async () => {
    console.log('Verificando atualizações na api...')
    let databaseLength = await NewsArticles.estimatedDocumentCount();
    
    const { id } = await NewsArticles.findOne({ id: {$gt: 0} }).sort({ id: -1 })
 
    let baseUrlLength = api.length
    const getDataArticlesApi = await fetch(`${api}?_limit=${api.length}`)

     console.log(databaseLength, baseUrlLength,id)
     
    
    try {
      const response = await getDataArticlesApi.json()
      
      if(baseUrlLength > databaseLength) {
       
        response
        .filter(obj => obj.id > id)
        .map(async (data) => {

          let lauche = [];
          let event = [];
  
          const updateArticle = new NewsArticles()
          updateArticle.id = data.id
          updateArticle.title = data.title
          updateArticle.url = data.url
          updateArticle.imageUrl = data.imageUrl
          updateArticle.newsSite = data.newsSite
          updateArticle.summary = data.summary
          updateArticle.publishedAt = data.publishedAt
          updateArticle.updatedAt = data.updatedAt
          updateArticle.featured = data.featured
          updateArticle.lauches = data.launches.map((e) => {lauche.push(e)})
          updateArticle.events = data.events.map((e) => {event.push(e)})
          
          await updateArticle.save()
  
          console.log('update performed in '+ new Date())
        });    
      }
      
    } catch (err) {
      console.log(err)
      return;
    }
  
  });

module.exports = CronArticle