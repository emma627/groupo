const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const sequelize = require("./config/database");

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

// parse requests of content-type: application/json
app.use(bodyParser.json());

//headers pour éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //les routes du backend sont accesibles avec get...
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to groupomania API " });
});

//importer le routeur et enregistrer dans l'application
const routesUser = require("./routes/user.routes.js");
const routesPosts = require("./routes/post.routes.js");
const routesComments = require("./routes/comment.routes.js");

//enregistrer le routeur pour toutes les demandes effectuées ver ...
app.use("/users", routesUser);
app.use("/posts", routesPosts);
app.use("/comments", routesComments);

// contraint + onDelete supprime les post du User
//Un post a un utilsateur
// ex : post.user
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// un comment a un utilsateur
// comment.user
Comment.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// Un utilisteur a des posts
// user.posts
User.hasMany(Post);
// Un post a plusieurs commentaires
// post.comments
// post.comments[0]
// quand on supprime un Post : on supprime les commentaires
Post.hasMany(Comment, { onDelete: "CASCADE" });

sequelize
  // pour forcer la modification de la structure de la base
  // OU créer la base
  //.sync({force:true}) // créations des tables SQL
  .sync()
  .then((result) => {
    // set port, listen for requests
    // on lance le Server
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
