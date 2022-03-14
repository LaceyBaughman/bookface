<template>
  <div class="container-fluid">
    <div v-if="account.id" class="col-md-12 card post elevation-3">
      <CreatePost v-if="account.id" />
    </div>
    <div class="col-md-12 justify-content-center d-flex mt-3">
      <h1 class="primary mx-1">Pages:</h1>
      <h1
        class="primary hoverable mx-1"
        v-for="p in totalPages"
        :key="p"
        @click="changePage(p)"
      >
        {{ p }}
      </h1>
    </div>

    <div class="col-md-12 card post elevation-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
    <div
      class="col-md-12 justify-content-center d-flex mt-3"
      v-if="totalPages > 1"
    >
      <h1 class="primary mx-1">Pages:</h1>
      <button
        class="btn btn-primary m-2"
        v-for="p in totalPages"
        :key="p"
        @click="changePage(p)"
      >
        {{ p }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { squaresService } from "../services/SquaresService";

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
        await squaresService.getSquares();
      } catch (error) {
        logger.log("[HomePage]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      squares: computed(() => AppState.squares),
      account: computed(() => AppState.account),
      totalPages: computed(() => AppState.totalPages),

      async changePage(page) {
        try {
          await postsService.changePage(page);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
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

.primary {
  color: rgb(63, 91, 153);
}

.hoverable {
  cursor: pointer;
}
</style>



