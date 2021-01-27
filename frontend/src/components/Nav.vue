<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="@/assets/img/logo-groupomania.png"
          width="200"
          alt="logoGroupomania"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <!-- Si le user est connecté -->
        <ul class="navbar-nav ml-auto" v-if="user.id">
          <!-- only show to admin -->
          <li v-if="user.admin == 1">
            <h5 class="ml-5 mr-5 mt-2 ">
              <span class="badge badge-danger">Admin</span>
            </h5>
          </li>
          <!-- only show to admin -->
          <li class="nav-item" v-if="user.admin == 1">
            <router-link to="/users" class="nav-link"
              >Les Utilisateurs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Myposts', params: { id: user.id } }"
              class="nav-link"
              >Mes Posts</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Profil', params: { id: user.id } }"
              class="nav-link"
              >Mon Profil</router-link
            >
          </li>
          <li class="nav-item ml-4">
            <a @click="logout" class="nav-link btn btn-secondary">
              {{ user.prenom }} {{ user.nom }}
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
        <!-- ELSE sinon le user est NON connecté -->
        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Se connecter</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/signup" class="nav-link"
              >S'enrgistrer</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: ["user"],

  methods: {
    logout() {
      //emit de user vide
      this.$emit("userLogout", {});

      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped lang="scss"></style>
