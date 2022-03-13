<template>
  <a href="https://boisecodeworks.com/">
    <img class="square-style" :src="square.tall"
  /></a>
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
.square-style {
  margin-top: 1em;
  margin-bottom: 1em;
  max-width: 250px;
}
</style>