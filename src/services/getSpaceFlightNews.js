const fetch= require('cross-fetch')
const NewsArticles = require('../models/News')
const api = require('../constants/index')

const getNewsInfo = async () => {
  
  let countLength= api.length; 
  let countInsert = 1;
    try {
        const index = await NewsArticles.find()

        if(index.length === 0) {
          console.log('Populando banco de Dados, espere um momento...')

          const getData = await fetch(`${api}?_limit=${api.length}`)
          
          if( getData.status >= 400 ) {
            throw new Error('Erro na requisição');
          }
          const response = await getData.json();

          await response.map(async (data) => {                   
            let lauche = []
            let event = []
            let newArticle = new NewsArticles();
            newArticle.id = data.id;
            newArticle.title = data.title;
            newArticle.url = data.url;
            newArticle.imageUrl = data.imageUrl;
            newArticle.newsSite = data.newsSite;
            newArticle.summary = data.summary;
            newArticle.publishedAt = data.publishedAt;
            newArticle.updatedAt = data.updatedAt;
            newArticle.featured = data.featured;
            newArticle.lauches = data.launches.map((e) => {lauche.push(e)});  
            newArticle.events = data.events.map((e) => {event.push(e)}); 
            
            await newArticle.save();
    
            console.log(`Total de ${countInsert} Artigos incluidos no banco`);   
            
            countLength--;
            countInsert++;    
    
            if(countLength === 0) {
              console.log('Inserções no banco concluídas');
            }        
          });  
        }      
    
        return;
        
    } catch (error) {
        console.error(error,"error no servico")
    }
}
module.exports = getNewsInfo