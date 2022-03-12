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

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
      } catch (error) {
        logger.log("[HomePage]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
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



