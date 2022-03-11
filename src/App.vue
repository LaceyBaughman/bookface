<template>
  <header></header>
  <main class="main-bg debug">
    <div class="">
      <div class="row">
        <div class="col-md-2">
          <Sidebar />
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-12">
              <Navbar />
            </div>
            <div class="col-md-12">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: { Sidebar },
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
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
