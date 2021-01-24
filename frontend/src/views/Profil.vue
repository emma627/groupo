<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-6 text-left">
        <h1 class="mt-3">Mon Profil</h1>
        <div class="form-group">
          <label for="nom">
            Nom
          </label>
          <input id="nom" type="text" class="form-control" v-model="nom" />
        </div>
        <div class="form-group">
          <label for="prenom">
            Prénom
          </label>
          <input
            id="prenom"
            type="text"
            class="form-control"
            v-model="prenom"
          />
        </div>
        <div class="form-group">
          <label for="email">
            Email
          </label>
          <input id="email" type="text" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label for="img">
            Image
          </label>
          <input id="img" type="text" class="form-control" v-model="img" />
        </div>
        <button class="btn btn-primary text-white" @click="editUser">
          <i class="fas fa-edit"></i> Modifier
        </button>
        
        <button @click="deleteUser()" class="ml-2 btn btn-danger text-white">
          <i class="fas fa-trash"></i> Supprimer mon compte
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
  name: "Profil",
  data() {
    return {
      id: this.$route.params.id,
      nom: "",
      prenom: "",
      email: "",
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
    loadProfil() {
      var vm = this;
      fetch("http://localhost:3000/users/" + this.id)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          vm.nom = data.nom;
          vm.prenom = data.prenom;
          vm.email = data.email;
          vm.img = data.img;
        })
        .catch(function(error) {
          console.error(error);
        });
      // const route =useRoute();
    },
    editUser() {
      //
      let route = this.$router;
      let user = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        id: this.id,
        img: this.img,
      };

      fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(function(response) {
          console.log(response);
          route.push("/home");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteUser() {
      let test = confirm("Voulez vous vraiment supprimer ?");
      let vm = this;
      if (test) {
        fetch("http://localhost:3000/users/" + this.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function(response) {
            console.log(response);
            vm.$emit("userLogin", {});
            // on efface le user ds localStorage
            localStorage.clear();
            vm.$router.push({ name: "Login" });
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    },
  },
  mounted() {
    this.loadProfil();
  },
};
</script>
