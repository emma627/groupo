<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-6 text-left">
        <h1 class="mt-3">Modifier un Commentaire</h1>
        
        <div class="form-group">
          <label for="texte">
            Texte
          </label>
          <input type="text" class="form-control" v-model="texte" />
        </div>
       
        <button class="btn btn-primary text-white" @click="editComment">
          <i class="fas fa-edit"></i> Modifier un commentaire
        </button>
      </div>
      <div class="col-6">
        
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  name: "Comment",
  props: ['user'],
  data() {
    return {
      id:this.$route.params.id,
      texte: "",
    };
  
  },
  methods: {
      loadComment() {
      var vm = this;
      fetch("http://localhost:3000/comments/"+this.id)
        .then(function(response) {
         
          return response.json();
        })
        .then((post)=> {
          vm.texte = post.texte;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    editComment() {
      //
    let route = this.$router;
      let comment = {
        commentId:this.id,
        texte: this.texte,
        userId: this.user.id,
        
      };
      fetch('http://localhost:3000/comments', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(function(response) {
        console.log(response);
        route.push("/home");
      }).catch(function (error){
                console.error(error);
      });
    }
  },
  mounted() {
    this.loadComment();
  }
};
</script>
