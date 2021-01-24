const Comment = require("../models/comment.js");
const User = require("../models/user.js");

//---------------------------------------------------------------------------
// Trouver un Comment par son ID
//---------------------------------------------------------------------------
exports.findOne = (req, res, next) => {
  let id = req.params.id;
  Comment.findByPk(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};

//---------------------------------------------------------------------------
// Ajouter un Comment
//---------------------------------------------------------------------------
exports.insert = (req, res,next) => {
  let mycomment ={};
  const comment = Comment.build({
    texte   : req.body.texte,
    postId  : req.body.postId,
    userId  : req.body.userId
  });
  comment.save({include: User})
  .then(comment => {
    
    res.status(200).json(comment)
    
   })
  
  
  .catch((err) => console.log(err));
} 
//---------------------------------------------------------------------------
// Effacer un un comment
//---------------------------------------------------------------------------
exports.delete = (req, res,next) => {
    Comment.findByPk(req.params.id)
  .then((comment) => {
    return comment.destroy();
  })
  .then((response) => res.status(200).json(response))
  .catch((err) => console.log(err));
}

//---------------------------------------------------------------------------
// Modifier un comment
//---------------------------------------------------------------------------
exports.update = (req, res,next) => {
  Comment.findByPk(req.body.commentId)
  .then( comment =>{
    comment.texte    =req.body.texte;

    return comment.save();
  })
  .then( response => res.status(200).json(response) )
  .catch(error => res.status(500).json({ error:'error' }));
}
//---------------------------------------------------------------------------