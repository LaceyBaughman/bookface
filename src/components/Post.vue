<template>
  <div class="home-card p-4 bg-white rounded elevation-3 m-3">
    <div class="row m-2">
      <div class="col-md-1">
        <img
          :src="post.creator.picture"
          class="selectable"
          style="width: 70px"
          alt=""
        />
      </div>
      <div class="col-md-11">{{ post.creator }} {{ post.createdAt }}</div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">
        {{ post.body }}
      </div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">Heart/like</div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    post: {
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
</style>

