<template>
  <nav class="navbar nav-bg">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          class="logo mx-2"
          src="https://hardforum.b-cdn.net/data/attachment-files/2018/05/130078_Facebook-logo-b.jpg"
        />
      </div>
    </router-link>

    <form @submit.prevent="search()" class="bg-white rounded elevation-1 mx-5">
      <div class="form-group d-flex align-items-center">
        <label for="search" class="sr-only"></label>
        <input
          v-model="query"
          type="text"
          name="search"
          required
          class="form-control bg-white border-0"
          placeholder="search"
        />
        <button class="btn px-2 py-0" type="submit">
          <i class="mdi mdi-magnify f-18"></i>
        </button>
      </div>
    </form>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { ref } from "vue";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";

export default {
  setup() {
    const searchTerm = ref("");
    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAllPosts({ query: searchTerm.value });
        } catch (error) {
          logger.error("[NavSearch]", error);
          Pop.toast(error.message, "error");
        }
      },
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.logo {
  max-width: 300px;
}
.nav-bg {
  background-color: rgb(63, 91, 153);
}
</style>
