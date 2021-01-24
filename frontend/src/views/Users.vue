<template>
  <div class="container">
    <div class="row">
      <h1 class="mt-3">Les Utilisateurs</h1>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(user, index) in tabUser" :key="user.id">
            <td v-if="user.img"><img :src="user.img" width="50" /></td>
            <td v-else>
              <img
                src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                width="50"
              />
            </td>
            <td class="text-left">{{ user.nom }} {{ user.prenom }}
              <cite class="blockquote-footer">{{ getCleanDate(user.createdAt) }}</cite>
            </td>
            <td>
              <router-link
                :to="{ name: 'Myposts', params: { id: user.id } }"
                class="btn btn-primary text-white"
              >
                <i class="fas fa-edit"></i> Les Posts
              </router-link>
            </td>
            <td>
              <router-link
                :to="{ name: 'Profil', params: { id: user.id } }"
                class="btn btn-secondary"
                ><i class="fas fa-edit"></i>Profil</router-link
              >
            </td>
            <td>
              <button
                @click="deleteUser(user.id,index)"
                class="btn btn-danger text-white"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
 
  </div>

  
</template>

<script>
import myDate from "@/middleware/mydate";
export default {
  name: "Users",

  data() {
    return {
      tabUser: [],
    };
  },
  created: function() {
    var vm = this;
    fetch("http://localhost:3000/users")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        vm.tabUser = data;
        console.log(data);
      });
  },
  methods: {
      getCleanDate(date2){
      return myDate.dateFormat(date2);
    },
    deleteUser(id,index) {
      let test = confirm("Voulez vous vraiment supprimer ?");
      let vm=this;
      if (test) {
       
        fetch("http://localhost:3000/users/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function(response) {
            console.log(response);
            console.log(index);
            vm.tabUser.splice(index,1);
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    },
  },
};
</script>
<style scoped lang="scss">
/* enlever la ligne de boostrap devant */
.blockquote-footer::before {
  content: "" !important;
}
</style>
