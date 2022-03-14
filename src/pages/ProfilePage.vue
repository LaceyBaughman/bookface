<template>
  <div class="container-fluid">
    <!-- FIXME missing profile image, class and alumni status -->
    <div class="col-md-12 post elevation-3 d-flex justify-content-between">
      <div class="col-md-5">
        <img
          :src="profile.coverImg"
          style="height: 300px"
          class="my-3"
          alt=""
        />
        <h1>
          <img :src="profile.picture" style="height: 100px" alt="" />
          {{ profile.name }}
        </h1>
      </div>
      <ul>
        <h5>Biography:</h5>
        <p>{{ profile.bio || "Bio goes here." }}</p>

        <h5>Class:</h5>
        <p>{{ profile.class || "Class goes here." }}</p>

        <h5>GitHub:</h5>
        <a :href="profile.github">{{ profile.github || "GitHub goes here" }}</a>

        <h5>Linkedin:</h5>
        <a :href="profile.linkedin">{{
          profile.linkedin || "linkedin goes here"
        }}</a>

        <h5>Resume:</h5>
        <p>{{ profile.resume || "Resume goes here." }}</p>

        <h5 v-if="profile.graduated">
          Graduated <i class="mdi mdi-account-check"></i>
        </h5>
      </ul>

      <!-- FIXME I should not see this if it is not my profile -->
      <span>
        <button class="btn btn-primary rounded-pill">
          <i class="mdi mdi-pencil"></i></button
      ></span>
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
  margin-top: 2em;
  height: 20vh;
  object-fit: cover;
  border-radius: 15px;
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



