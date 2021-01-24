<template>
  <div class="form-signin">
    <h2 class="form-signin-heading">Se connecter</h2>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input
      v-model="email"
      type="text"
      id="inputEmail"
      class="form-control"
      placeholder="Email address"
      required
      autofocus
    /><br />
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      v-model="password"
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required
    />

    <button class="btn btn-lg btn-primary btn-block mb-4" @click="loginUser">
      Sign in
    </button>
    <router-link to="/signup" class=""> S'enregister</router-link>

    <div class="alert alert-danger" v-if="messageError">
      login ou mot de passe incorrecte
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      messageError: false,
    };
  },
  methods: {
    loginUser() {
      let loginData = {
        email: this.email,
        password: this.password,
      };

      fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then(response => {
          return response.json();
        })
        .then(dataUser=> {
          if (dataUser.error == undefined) {
            //evoyer dataUser au parent App.vue
            this.$emit("userLogin", dataUser);
            this.$router.push({ name: "Home" });
          } else this.messageError = true;
        })
        .catch(function (error) {
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
