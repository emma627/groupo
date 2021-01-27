<template>
  <div class="container">
    <header class="jumbotron pt-3 pb-3">
      <h1>Bievenue sur notre réseau social groupomania !</h1>
      <p class="lead">Vous pouvez échanger et poster vos bonnes idées</p>
      <router-link to="/ajouter" class="btn btn-primary text-white">
        <i class="fas fa-plus"></i> Ajouter un post
      </router-link>
    </header>
    <div class="row">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :user="user"
        @updatePost="getUpdatedPost"
      />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post";
export default {
  name: "Home",
  props: ["user"],
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getUpdatedPost() {
      this.posts = [];
      this.loadPost();
    },
    loadPost() {
      fetch("http://localhost:3000/posts", {
        headers: {
          Authorization: "Bearer " + this.user.token,

          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          this.posts = data;
          console.log(data);
        });
    },
  },
  created: function() {
    this.loadPost();
  },
};
</script>
