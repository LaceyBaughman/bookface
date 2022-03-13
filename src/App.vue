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
            <div class="col-md-2" v-for="s in square" :key="s.title">
              <Squares :square="s" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { AppState } from "./AppState";

export default {
  name: "App",
  setup() {
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
</style>
