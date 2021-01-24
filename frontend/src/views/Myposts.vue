<template>
  <div class="container">
    <header class="jumbotron pt-3 pb-3">
      <h1>Bievenue sur notre réseau social groupomania !</h1>
      <p class="lead">Vous pouvez échanger et poster vos bonnes idées</p>
      <router-link to="/ajouter" class="btn btn-primary text-white">
        <i class="fas fa-plus"></i> Ajouter un post
      </router-link>
    </header>
    <div class="row" v-for="post in tabPost" :key="post.id">
      <Post :post="post" :user="user" @updatePost="getPost"/>
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
      tabPost: [],
    id:this.$route.params.id
    };
  },
  methods: {
    getPost() {
      this.posts = [];
      this.loadPost();
    },
    loadPost() {
       var vm = this;
    fetch("http://localhost:3000/posts/user/"+this.id)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        vm.tabPost = data;
        console.log(data);
      });
    }
  },
  created: function() {
   this.loadPost();
  },
};
</script>
