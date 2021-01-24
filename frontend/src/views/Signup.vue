<template>
  <div class="form-signin">
    <h2 class="form-signin-heading">S'enregistrer</h2>
    <label for="prenom" class="sr-only">Prénom </label>
    <input
      v-model="prenom"
      type="text"
      id="prenom"
      class="form-control"
      placeholder="Prénom"
      required
      autofocus
    /><br />
    <label for="nom" class="sr-only">Nom</label>
    <input
      v-model="nom"
      type="text"
      id="nom"
      class="form-control"
      placeholder="Nom"
      required
    /><br />
    <label for="email" class="sr-only">Email</label>
    <input
      v-model="email"
      type="email"
      id="email"
      class="form-control"
      placeholder="Email"
      required
    /><br />
    <label for="password" class="sr-only">Password</label>
    <input
      v-model="password"
      type="password"
      id="password"
      class="form-control"
      placeholder="Mot de passe"
      required
    />

    <button class="btn btn-lg btn-primary btn-block" @click="saveUser">
      S'enregistrer
    </button>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      nom: "",
      prenom: "",
      password: "",
      email: "",
    };
  },
  methods: {
    saveUser() {
      // on récupère les donées des champs "input"
      // grace a "data" avec 2 ways binding
      let newUser = {
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        email: this.email,
      };

      // on envoie les données au serveur
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then(() => {
          // on redirige vers login pour se connecter
          this.$router.push({ name: "Login" });
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
