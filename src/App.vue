<template>
  <header></header>
  <main class="main-bg debug">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 px-0 d-none d-md-block sticky-top">
          <Sidebar />
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-12 px-0">
              <Navbar :post="p" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 px-0">
              <router-view />
            </div>
            <div class="col-md-2" v-for="s in square" :key="s.id">
              <Billboards :square="s" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "./AppState";
import { squaresService } from "../services/SquaresService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";

export default {
  name: "App",
  setup() {
    onMounted(async () => {
      try {
        await squaresService.getSquares();
      } catch (error) {
        logger.log("[SquareComponent]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      appState: computed(() => AppState),
      posts: computed(() => AppState.posts),
      squares: computed(() => AppState.squares),
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

.main-bg {
  background-color: rgb(245, 249, 247);
}
</style>
