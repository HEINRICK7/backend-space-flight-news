
const News = require('../models/News.js')

module.exports = {

    async indexInitial(req, res) {

        return res.status(200).json({message:  "Fullstack Challenge 2021 🏅 - Space Flight News"})
    },

    async index(req, res){
      const { _page, _order } = req.query;

      let order = _order ? _order : -1;
      let page = _page ? ( _page ) : 1;
      let limit = 10;
      let skip = limit * (Number(page) - 1);
  
      const dataArticle = await News.find()
        .sort({publishedAt: Number(order)})
        .skip(skip)
        .limit(limit);
  
      if(dataArticle) {
        return res.status(200).json(dataArticle);
      }
  
      return res.status(404).json({message: 'Não há informações cadastradas'});
  
    },

    async show(req, res){
      const { title } = req.params;

    const article = await News.find({$text: {$search: title}});
    
    if(article) {
      return res.status(200).json(article);
    }

    return res.status(404).json({message: 'Não há informações cadastradas'});
  }
}