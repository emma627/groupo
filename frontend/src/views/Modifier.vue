<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-6 text-left">
        <h1 class="mt-3">Modifier un Post</h1>
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
            Gif
          </label>
          <input type="text" class="form-control" v-model="img" />
        </div>
        <button class="btn btn-primary text-white" @click="addPost">
          <i class="fas fa-edit"></i> Modifier un post
        </button>
      </div>
      <div class="col-6">
        <br /><br />
        <img width="200" :src="image" alt="" />
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  name: "Modifier",
  props: ["user"],
  data() {
    return {
      id: this.$route.params.id,
      titre: "",
      texte: "",
      img: "",
    };
  },
  computed: {
    image() {
      if (this.img == "") return "http://placehold.it/300x200";
      else return this.img;
    },
  },
  methods: {
    loadPost() {
      fetch("http://localhost:3000/posts/" + this.id)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.titre = data.titre;
          this.texte = data.texte;
          this.img = data.img;
        })
        .catch((error) =>{
          console.error(error);
        });
    },
    addPost() {
      let post = {
        postId: this.id,
        titre: this.titre,
        texte: this.texte,
        userId: this.user.id,
        img: this.img,
      };
      console.log(post);

      fetch("http://localhost:3000/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(() => {
          this.$router.push("/home");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
  mounted() {
    //remettre à jour après modification
    this.loadPost();
  },
};
</script>
