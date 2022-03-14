<template>
  <div class="container-fluid px-0">
    <div class="row px-0">
      <img :src="coverImg" class="my-2 cover-img" alt="..." />
      <div class="card-img-overlay d-flex">
        <div>
          <img :src="profile.picture" class="profile-img rounded" alt="" />
        </div>
        <div
          class="
            col-md-12
            card
            post
            elevation-3
            m-2
            d-flex
            justify-content-between
          "
        >
          <div>
            <h4 class="card-title">{{ profile.name }}</h4>
            <h6 class="card-title">{{ profile.email }}</h6>
            <p class="card-text">{{ profile.bio }}</p>
          </div>
          <div>
            <button class="btn btn-outline-warning rounded-pill">
              <i class="mdi mdi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h5>Github:</h5>
        <span>{{ profile.github }}</span>
        <h5>LinkedIn:</h5>
        <span>{{ profile.linkedin }}</span>
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
      <Post v-for="p in posts" :key="p.id" :post="p" />
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
    const route = useRoute;
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postService.getAll(
            "api/posts",
            "?creatorId=" + route.params.id
          );
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
      posts: computed(() => AppState.posts),
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
  width: 100%;
  height: 19vh;
  object-fit: cover;
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



