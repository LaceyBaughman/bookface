
<template>
  <div class="sb-arrange">
    <router-link
      v-if="!user.isAuthenticated"
      :to="{ name: 'Profile', params: { id: account?.id } }"
    >
      <img
        @click="goTo('Profile')"
        alt="logo"
        :src="user.picture"
        class="rounded-image"
      />
    </router-link>

    <span class="navbar-text">
      <button
        aria-describedby="Login"
        class="
          btn
          selectable
          text-success
          lighten-30
          text-uppercase
          my-2 my-lg-0
        "
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div class="text" v-else>
        {{ user.name }}
      </div>
      <div class="p-0 list-group w-100">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div
            @click="goHome()"
            aria-describedby="Home"
            class="list-group-item list-group-item-action hoverable"
          >
            Home
          </div>
        </router-link>

        <router-link :to="{ name: 'Account' }">
          <div
            @click="goTo('Account')"
            aria-describedby="Manage Account"
            class="list-group-item list-group-item-action hoverable"
          >
            Account
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i aria-describedby="Logout" class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </span>
  </div>
</template>


<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    const router = useRouter();
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),

      router,
      async goHome() {
        try {
          await postsService.getAllPosts();
          // router.push({
          //   name: "Home",
          // });
          //window.location.reload("/Home");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log("[GoHome]", error);
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
.rounded-image {
  margin-top: 2em;
  margin-bottom: 2em;
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

.text {
  color: rgb(63, 91, 153);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

