
const News = require('../models/News.js')

module.exports = {

    async indexInitial(req, res) {

        return res.status(200).json({message:  "Fullstack Challenge 2021 🏅 - Space Flight News"})
    },

    async store(req, res){
    
     
      try {
         
        const createArticle = await News.create(req.body);
  
        return res.status(201).json(createArticle);

      } catch (error) {
          return res.status(400).json({error: "error"});
      }
    },

    async index(req, res){
      
      const dataArticle = await News.find()
        
  
      if(dataArticle) {
        return res.status(200).json(dataArticle);
      }
  
      return res.status(404).json({message: 'Não há informações cadastradas'});
  
    },

    async show(req, res){
      const { _id } = req.params
      try {
        const articleId = await News.findById(_id)
        return res.json(articleId)
      } 
      catch (error) {
        return res.status(404).json({message: 'Não há informações cadastradas'});
        
      }
  
    },

    async update(req, res) {
    const { _id } = req.params
    try {
      const {
        id,
        featured,
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        publishedAt,
        launches,
        events
      } = req.body;

        const updateArtecles = await News.findByIdAndUpdate(_id, {
          id,
          featured,
          title,
          url,
          imageUrl,
          newsSite,
          summary,
          publishedAt,
          launches,
          events
            
        }, {new: true});
        
        await updateArtecles.save();

        return res.status(200).send({message: 'Artigo atualizado com sucesso'})    
    } catch (error) {
        return res.status(400).send({error: 'Error update '});
    }
    },

    async destroy(req, res) {
    const { _id } = req.params
    try {
       await News.findByIdAndRemove(_id);
        return res.send({message: 'Artigo deletado com sucesso'}).status(200)
    } catch (error) {

        return res.status(400).send({ error: 'Error deleting project'});
        
    }
    }
}