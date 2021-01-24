const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Retrieve all User from the database.
//---------------------------------------------------------------------------
// Afficher Tous les utilisateurs
//---------------------------------------------------------------------------
exports.findAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// Trouver un User par son ID
//---------------------------------------------------------------------------
exports.findOne = (req, res, next) => {
  let id = req.params.id;
  User.findByPk(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
//---------------------------------------------------------------------------
// S'enregistrer
//---------------------------------------------------------------------------
exports.signup = (req, res, next) => {
  //créer  un nouvel user avec ce mot de passe crypté
  // on code le mot passe avec bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json({ error: "error signup" }));
};
//---------------------------------------------------------------------------
// SE connecter avec login(email) et password
//---------------------------------------------------------------------------
exports.login = (req, res, next) => {
  let email = req.body.email;
  User.findOne({
    //SELECT * FROM user WHERE email='...'
    where: { email: email },
    // SELECT id,email,nom,... FROM user
    // attributes: ["id", "email", "img", "nom", "prenom", "password", "admin"],
  })
    .then((user) => {
      if (user.length == 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      console.log(user.password);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            let token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              //expiresIn: "24h",
              expiresIn: "365d",
              
            });
            // on ne peut pas faire user.token = a cause de sequelize
            user.setDataValue("token", token);
            res.status(200).json(user);
          }
        })
        .catch((error) => res.status(500).json({ error: "password 2" }));
    })
    .catch((error) => res.status(500).json({ error: "error login" }));
};

//---------------------------------------------------------------------------
// Mettre a jour le profil utilisteur
//---------------------------------------------------------------------------
exports.update = (req, res, next) => {
  User.findByPk(req.body.id)
    .then((user) => {
      user.nom = req.body.nom;
      user.prenom = req.body.prenom;
      user.email = req.body.email;
      user.img = req.body.img;
      return user.save();
    })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json({ error: "error" }));
};
//---------------------------------------------------------------------------
// Effacer un User avec ses Post
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
