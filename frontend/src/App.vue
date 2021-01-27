<template>
  <Nav :user="user" @userLogout="getUser" />
  <router-view @userLogin="getUser" :user="user"></router-view>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "Main",
  data() {
    return {
      user: {},
    };
  },
  components: {
    Nav,
  },
  methods: {
    //quand login emit user
    getUser(dataUser) {
      //user est envoyé au router-view et à nav
      this.user = dataUser;
      // on memorise le user dans local storage
      localStorage.setItem("user", JSON.stringify(dataUser));
    },
  },
  created: function() {
    // si on reload la page on prend le user ds localStorage
    if (!this.user.id) {
      if (localStorage.getItem("user") != null) {
        this.user = JSON.parse(localStorage.user);
      }
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
