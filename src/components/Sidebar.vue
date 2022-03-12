<template>
  <div class="sb-arrange">
    <img :src="user.picture" class="rounded-image" />
  </div>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
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
.rounded-image {
  margin-top: 2em;
  border-radius: 50%;
  height: 100px;
  width: 100px;
}

.sb-arrange {
  position: sticky;
  text-align: center;
  background-color: rgb(255, 255, 255);
  height: 100vh;
}
</style>

