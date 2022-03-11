<template>
  <div class="home-card p-4 bg-white rounded elevation-3 m-5">
    <div class="row m-2">
      <div class="col-md-2">
        <img
          :src="post.creator.picture"
          class="selectable"
          style="width: 200px"
        />
      </div>
      <div class="col-md-10">
        <b>{{ post.creator.createdAt }}</b>
        <p class="m-1">{{ post.body }}</p>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-md-12">
        <b>{{ post.creator.name }}</b>
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

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>


