<template>
  <div class="container-fluid">
    <div class="col-md-12 card post elevation-3">
      <CreatePost v-if="account.id" />
    </div>
    <div class="col-md-12 card post elevation-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";

export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
      } catch (error) {
        logger.log("[ProfilePage]", error.message);
        Pop.toast(error.message, "error");
      }
    });
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