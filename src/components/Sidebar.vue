<template>
  <div class="col-12 sb-arrange">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
      <div class="d-flex flex-column align-items-center">
        <!--img here-->
        Hello!
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
.sb-arrange {
  padding: 2em;
  background-color: rgb(255, 255, 255);
  height: 100vh;
}
</style>