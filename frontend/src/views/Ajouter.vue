<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-6 text-left">
        <h1 class="mt-3">Ajouter un Post</h1>
        <div class="form-group">
          <label for="titre">
            Titre
          </label>
          <input type="text" class="form-control" v-model="titre" />
        </div>
        <div class="form-group">
          <label for="texte">
            Texte
          </label>
          <input type="text" class="form-control" v-model="texte" />
        </div>
        <div class="form-group">
          <label for="img">
            Gif Link
          </label>
          <input type="text" class="form-control" v-model="imgLink" />
        </div>
        <button class="btn btn-primary text-white" @click="addPost">
          <i class="fas fa-plus"></i> Ajouter un post
        </button>
      </div>
      <div class="col-6">
        <br /><br />
        <img width="200" :src="image" alt="postGif" />
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  name: "Ajouter",
  props: ["user"],
  data() {
    return {
      titre: "",
      texte: "",
      imgLink: "",
    };
  },

  computed: {
    image() {
      if (this.imgLink == "") return "http://placehold.it/300x200";
      else return this.imgLink;
    },
  },
  methods: {
    addPost() {
      if (
        this.titre.trim() == 0 ||
        this.texte.trim() == 0 ||
        this.imgLink.trim() == 0
      ) {
        alert("Saisi incorrect");
      } else {
        let post = {
          titre: this.titre,
          texte: this.texte,
          userId: this.user.id,
          img: this.imgLink,
        };
        console.log(post);

        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
