<template>
  <div class="home-card p-4 bg-white rounded elevation-3 m-3">
    <div class="row m-2">
      <div class="col-md-1">{{ posts.imgUrl }}</div>
      <div class="col-md-11">{{ posts.creator }} {{ posts.createdAt }}</div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">
        {{ posts.body }}
      </div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">Heart/like</div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";

export default {
  setup() {
    const route = useRoute;
    watchEffect(async () => {
      try {
        await profilesService.getProfile(route.params.id);
        await postsService.getAllPosts({ creatorId: route.params.id });
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
  },
};
</script>


<style lang="scss" scoped>
</style>