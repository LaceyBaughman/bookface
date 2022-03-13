<template>
  <div class="container-fluid text-center">
    <div class="row">
      <div class="col-md-8 p-0">
        <CreatePost v-if="account.id" />
      </div>
      <div
        v-for="p in posts"
        :key="p.id"
        class="col-md-8 card elevation-3 m-4 justify-content-center"
      >
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAllPosts({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => Appstate.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
.profile-img {
  aspect-ratio: 1;
  min-width: 5em;
  max-width: 7em;
}
</style>