<template>
  <div class="container-fluid">
    <!-- <ProfileData /> -->
    <div class="col-md-12 px-0">
      <img :src="profile.coverImg" class="cover-img" alt="..." />

      <img
        :src="profile.picture"
        class="profile-img overlap-img rounded"
        alt=""
      />
    </div>
    <!-- FIXME missing profile image, class and alumni status -->
    <div class="col-md-12 post elevation-3 d-flex justify-content-between">
      <div>
        <h4 class="card-title">{{ profile.name }}</h4>
      </div>
      <div>
        <h6>{{ profile.email }}</h6>
        <p>{{ profile.bio }}</p>
        <h5>Github:</h5>
        <span>{{ profile.github }}</span>
        <h5>LinkedIn:</h5>
        <span>{{ profile.linkedin }}</span>
        <!-- FIXME I should not see this if it is not my account -->
        <button class="btn btn-primary rounded-pill">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
    </div>

    <div v-if="account.id" class="col-md-12 card post elevation-3">
      <CreatePost />
    </div>
    <div div class="d-flex justify-content-center" v-if="totalPages > 1">
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

    <div class="col-md-12 card post elevation-3" v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";

export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profilesService.getProfilePosts(route.params.id);
      } catch (error) {
        console.error(error);
        Pop.toast(error.message, "error");
      }
    });
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
        }
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error);
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      profilePosts: computed(() => AppState.profilePosts),
      posts: computed(() => AppState.profilePosts),
      totalPages: computed(() => AppState.totalPages),
      async getPage(page) {
        try {
          await postsService.getPage(page);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.profile-img {
  height: 100px;
  width: 100px;
}
.cover-img {
  height: 20vh;
  object-fit: cover;
  position: relative;
  top: 0;
  left: 0;
}
.overlap-img {
  position: absolute;
  top: 20px;
  left: 50px;
}

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



