<template>
  <div class="container-fluid">
    <!-- FIXME missing profile image, class and alumni status -->
    <div
      class="col-lg-12 post elevation-3 d-flex justify-content-between profile"
    >
      <div class="col-md-5">
        <div class="row d-none d-lg-block">
          <div class="col-md-5">
            <img
              :src="profile.coverImg"
              style="height: 300px"
              class="my-3"
              alt=""
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block">
            <img
              :src="profile.picture"
              class="profile-img"
              style="height: 100px"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <h3>{{ profile.name }}</h3>

          <b>Biography:</b>
          <p>{{ profile.bio || "Bio goes here." }}</p>

          <b>Class:</b>
          <p>{{ profile.class || "Class goes here." }}</p>

          <b>GitHub:</b>
          <p>
            <a :href="profile.github">{{
              profile.github || "GitHub goes here."
            }}</a>
          </p>

          <b>Linkedin:</b>
          <p>
            <a :href="profile.linkedin">{{
              profile.linkedin || "Linkedin goes here."
            }}</a>
          </p>

          <b>Resume:</b>
          <p>{{ profile.resume || "Resume goes here." }}</p>

          <b v-if="profile.graduated">
            Graduated <i class="mdi mdi-account-check"></i>
          </b>
          <b v-else>
            Not Graduated <i class="mdi mdi-alpha-x-circle-outline"></i>
          </b>

          <!-- FIXME I should not see this if it is not my profile -->
        </div>
      </div>
      <span v-if="account.id == profile.id">
        <button class="btn btn-primary rounded-pill">
          <i class="mdi mdi-pencil"></i></button
      ></span>
    </div>

    <div
      v-if="account.id == profile.id"
      class="col-md-12 card post elevation-3"
    >
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
  height: 40px;
  width: 90px;
  transform: translate(270px, -80px);
  border-radius: 50%;
}
.cover-img {
  margin-top: 2em;
  max-width: 100%;
  height: auto;
  border-radius: 20px;
}

.profile {
  height: auto;
}

.post {
  background-color: rgb(255, 255, 255);
  font-family: "Poppins", sans-serif;

  padding: 2em;
  margin-top: 2em;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.primary {
  color: rgb(63, 91, 153);
}

.hoverable {
  cursor: pointer;
}

h3 {
  font-weight: 800;
}

b {
  font-weight: 900;
}
</style>



