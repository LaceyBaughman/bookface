<template>
  <div class="home-card p-4 bg-white rounded elevation-3 m-3">
    <div class="row m-2">
      <div class="col-12"><b>Create Post: </b></div>
    </div>
    <div class="row m-2 p-2">
      <div class="col-md-12">Input field goes here</div>
      <div class="row m-2">Button goes here.</div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

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