<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="p in posts"
        :key="p.id"
        class="
          home
          flex-grow-1
          d-flex
          flex-column
          align-items-center
          justify-content-center
        "
      >
        <!-- <CreatePost /> -->
        <Post :post="p" />
      </div>
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
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>



