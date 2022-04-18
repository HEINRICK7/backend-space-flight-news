const fetch = require("cross-fetch");
const cron = require("node-cron"); 

const EmailService = require("./emailServices")

const NewsArticles = require("../models/News");

const CronArticle = cron.schedule('*/01 * * * * *', async () => {
    
    let countInsertionBefore = await NewsArticles.count({ id: {$gt: 0} });
    const { id } = await NewsArticles.findOne({ id: {$gt: 0} }).sort({ id: -1 });
    
    const apiUrl = `https://api.spaceflightnewsapi.net/v3/articles`;
    let countInsertionAfter = apiUrl.length;

    
    const getDataArticlesApi = await fetch(`${apiUrl}?_limit=${apiUrl.length}`);
    
    if(getDataArticlesApi.status === 200) {

    try {
      const response = await getDataArticlesApi.json();
      if(countInsertionAfter > countInsertionBefore) {
      
        const dataArticle = response.filter(obj => obj.id >= id);
        await dataArticle.map(async (data) => {
  
          let lauche = [];
          data.launches.map((e) => {
            lauche.push(e);
          });  
          
          let event = [];
          data.events.map((e) => {
            event.push(e)
          });
  
          const updateArticle = new NewsArticles();
          updateArticle.id = data.id;
          updateArticle.title = data.title;
          updateArticle.url = data.url;
          updateArticle.imageUrl = data.imageUrl;
          updateArticle.newsSite = data.newsSite;
          updateArticle.summary = data.summary;
          updateArticle.publishedAt = data.publishedAt;
          updateArticle.updatedAt = data.updatedAt;
          updateArticle.featured = data.featured;
          updateArticle.lauches = lauche;
          updateArticle.events = event; 
          
          await updateArticle.save();
  
          console.log('update performed in '+ new Date());
        });    
      }
      
    } catch (err) {
      console.log(err);
      return;
    }
  }else if(getDataArticlesApi.status >= 400) {
    
    console.log('error na requisição, enviando email com detalhes',getDataArticlesApi.status);
    EmailService()
  }
  });


module.exports = CronArticle;