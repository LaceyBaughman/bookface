<template>
  <div class="home-card p-4 bg-white rounded elevation-3 m-3">
    <div class="row m-2">
      <div class="col-md-1">{{ post.imgUrl }}</div>
      <div class="col-md-11">{{ post.creator }} {{ post.createdAt }}</div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">
        {{ post.body }}
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
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>