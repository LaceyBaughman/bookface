<template>
  <div class="container-fluid">
    <div class="col-md-12 card post elevation-3">
      <CreatePost />
    </div>
    <div class="col-md-12 card post elevation-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import Post from "../components/Post.vue";
import CreatePost from "../components/CreatePost.vue";

export default {
  components: { CreatePost },
  components: { Post },
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
      } catch (error) {
        logger.log(error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      page: computed(() => AppState.page),
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped lang="scss">
.post {
  background-color: rgb(255, 255, 255);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  padding: 2em;
  margin-top: 2em;
  border-radius: 15px;
}
</style>



