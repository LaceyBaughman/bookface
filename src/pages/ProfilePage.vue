<template>
  <div class="container-fluid">
    <div class="row">
      <EditProfile v-if="account.id == prifle.id" />
      Posts by id here.
    </div>
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
</style>