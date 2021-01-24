const Post = require("../models/post.js");
const User = require("../models/user.js");
const Comment = require("../models/comment.js");
//---------------------------------------------------------------------------
// Afficher tous les Post
//---------------------------------------------------------------------------
exports.findAll = (req, res, next) => {
  Post.findAll(
    // LEFT JOIN comment et INNER JOIN user
    //{ AVANT include: ['comments','user']}
    {
      include: [
        // on récupère l'author du post(INNER JOIN)
        { model: User },
        {//ensuite, on récupère tous les comments du post(LEFT JOIN)
          model: Comment,
          include: [
            {//enfin, on récupère les users qui ont fait les comments(LEFT JOIN)
              model: User,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC'],[{ model: Comment }, "createdAt", "DESC"]],
    }
  )
    .then((posts) => res.status(200).json(posts))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// Afficher 1 Post
//---------------------------------------------------------------------------
exports.findById = (req, res, next) => {
  let id = req.params.id;
  Post.findByPk(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// Afficher tous les Post d' un seul utilisateur
//---------------------------------------------------------------------------
exports.findByUser = (req, res, next) => {
  Post.findAll({
    include: [
      { model: User },
      {
        model: Comment,
        include: [
          {
            model: User,
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC'],[{ model: Comment }, "createdAt", "DESC"]],
    where: { userId: req.params.id },
  })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// Ajouter un post
//---------------------------------------------------------------------------
exports.insert = (req, res, next) => {
  Post.create({
    titre: req.body.titre,
    texte: req.body.texte,
    img: req.body.img,
    userId: req.body.userId,
  })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// Effacer un post
//---------------------------------------------------------------------------
exports.delete = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      return user.destroy();
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};

//---------------------------------------------------------------------------
// Modifier un post
//---------------------------------------------------------------------------
exports.update = (req, res, next) => {
  Post.findByPk(req.body.postId)
    .then((post) => {
      post.titre = req.body.titre;
      post.texte = req.body.texte;
      post.img = req.body.img;
      return post.save();
    })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json({ error: "error" }));
};
//---------------------------------------------------------------------------
// Effacer un Post avec ses comments
//---------------------------------------------------------------------------
exports.delete = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      return post.destroy();
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
