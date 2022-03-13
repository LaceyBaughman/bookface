<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-md-2 px-0 d-none d-lg-block sticky-top sidebar-bg"
        ></div>
        <div class="col-md-10 px-0">
          <Navbar />
        </div>
      </div>
    </div>
  </header>
  <main class="main-bg debug">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 px-0 d-none d-lg-block sticky-top">
          <Sidebar />
        </div>
        <div class="col-md-8">
          <router-view />
        </div>
        <div class="col-md-2 d-none d-lg-block px-0 text-center">
          <Squares :square="s" v-for="s in squares" :key="s.title" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "./AppState";
import { squaresService } from "./services/SquaresService";

export default {
  name: "App",
  setup() {
    onMounted(async () => {
      try {
        await squaresService.getSquares();
      } catch (error) {
        logger.log("[AppVue: Squares]", res.data);
        Pop.toast(error.message, "error");
      }
    });
    return {
      appState: computed(() => AppState),
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
.sidebar-bg {
  background-color: rgb(255, 255, 255);
}
</style>
