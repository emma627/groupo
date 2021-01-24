<template>
  <div class="offset-lg-3 col-lg-6 offset-1 col-10 mb-5">
    <div class="card h-100">
      <div class="card-header text-left">
        <div class="row">
          <div class="col-3">
            <img width="50" :src="userImg" alt="authorImg" /><br />
            <span class="badge badge-danger" v-if="post.user.admin == 1"
              >Admin</span
            >
            <blockquote>
              <footer class="blockquote-footer mt-2">
                {{ post.user.prenom }} {{ post.user.nom }}
              </footer>
            </blockquote>
          </div>
          <div class="col-9">
            <cite class="blockquote-footer">{{
              getCleanDate(post.createdAt)
            }}</cite>
            <h4 class="card-title">{{ post.titre }}</h4>
          </div>
        </div>
      </div>
      <img class="card-img-top" :src="gifImg" alt="postGif" />
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <p class="card-text text-left">
              <strong> {{ post.texte }}</strong>
              <!--<br /><a href="#">lien</a>-->
            </p>
          </div>
          <!-- <div class="col-2">
            <a href="#" class="btn btn-light"> <i class="fas fa-heart"></i></a>
          </div> -->
        </div>
      </div>
      <!--  pouvoir effacer son propre Post étant l'author du post ou admin-->
      <div class="card-footer" v-if="user.id == post.user.id || user.admin">
        <div class="row">
          <div class="col-6 text-left">
            <button
              @click="deletePost"
              class="btn btn-danger"
              aria-labelledby="effacer"
            >
              <i class="fas fa-trash"></i> effacer
            </button>
          </div>
          <div class="col-6 text-right">
            <!--pouvoir modifier son propre post étant l'author du post-->
            <router-link
              v-if="user.id == post.user.id"
              :to="{ name: 'Modifier', params: { id: post.id } }"
              class="btn btn-primary"
              ><i class="fas fa-edit"></i> modifier
            </router-link>
          </div>
        </div>
      </div>
      <!--  les comments -->
      <div
        class="card-footer"
        v-for="comment in post.comments"
        :key="comment.id"
      >
        <div class="row">
          <div class="col-2 col-xl-2">
            <img class="card-img-top" :src="comment.user.img" alt="userImg" />
            <blockquote>
              <footer class="blockquote-footer mt-2">
                {{ comment.user.prenom }} {{ comment.user.nom }}
              </footer>
            </blockquote>
          </div>
          <div class="col-10 col-xl-7 text-left">
            <cite class="blockquote-footer">{{
              getCleanDate(comment.updatedAt)
            }}</cite>
            {{ comment.texte }}
          </div>
          <div class="col-12 col-xl-3">
            <!--pouvoir delete son propre comment étant l'author du comment ou admin-->
            <button
              v-if="user.id == comment.user.id || user.admin"
              @click="deleteComment(comment.id)"
              class="btn btn-danger"
            >
              <i class="fas fa-trash"></i>
            </button>
            &nbsp;
            <router-link
              :to="{ name: 'Comment', params: { id: comment.id } }"
              class="btn btn-primary"
              v-if="user.id == comment.user.id"
            >
              <i class="fas fa-edit"></i>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Ajouter un comment -->
      <div class="card-footer">
        <div class="row">
          <div class="col-2">
            <img class="card-img-top" :src="user.img" alt="UserCommentImg" />
          </div>
          <div class="col-8">
            <label for="comment">Ajouter un commentaire</label>
            <input
              id="comment"
              type="text"
              class="form-control mt-2"
              v-model="texteComment"
            />
          </div>
          <div class="col-2">
            <button
              title="Ajouter un commentaire"
              @click="addComment"
              class="btn btn-primary mt-2"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myDate from "@/middleware/mydate";
export default {
  name: "Post",
  data() {
    return {
      texteComment: "",
    };
  },
  props: ["post", "user"],
  computed: {
    userImg() {
      let imgAuteur = "";
      if (this.post.user.img == null) {
        imgAuteur =
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
      } else {
        imgAuteur = this.post.user.img;
      }
      return imgAuteur;
    },
    gifImg() {
      let img = "";
      if (!this.post.img) {
        img = "http://placehold.it/300x100";
      } else {
        img = this.post.img;
      }
      return img;
    },
  },

  methods: {
    getCleanDate(date2) {
      return myDate.dateFormat(date2);
    },

    deletePost() {
      let test = confirm("Voulez vous vraiment supprimer ce post?");

      if (test) {
        fetch("http://localhost:3000/posts/" + this.post.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            this.$emit("updatePost");
          })

          .catch(function(error) {
            console.error(error);
          });
      }
    },

    deleteComment(id) {
      let test = confirm("Voulez vous vraiment supprimer ce commentaire?");

      if (test) {
        fetch("http://localhost:3000/comments/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then(() => {
            this.$emit("updatePost");
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    },

    addComment() {
      let comment = {
        postId: this.post.id,
        userId: this.user.id,
        texte: this.texteComment,
      };
      console.log(comment);
      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          this.$emit("updatePost");
          this.texteComment = "";
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* enlever la ligne de boostrap devant */
.blockquote-footer::before {
  content: "" !important;
}
</style>
