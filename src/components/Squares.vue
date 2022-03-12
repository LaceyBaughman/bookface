<template>
  <div class="component"><img :src="square.square" class="billboard" /></div>
</template>


<script>
export default {
  props: {
    square: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
.billboard {
  max-width: 200px;
}
</style>