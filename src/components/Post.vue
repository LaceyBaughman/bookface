<template>
  <div class="body d-flex justify-content-between p-2 px-3 body">
    <div class="body d-flex flex-row align-items-center">
      <img :src="post.creator.picture" class="rounded-image" width="50" />
      <div class="d-flex flex-column">
        <span class="name font-weight-bold mx-2">{{ post.creator.name }}</span>
      </div>
    </div>
    <div class="d-flex flex-row mt-1">
      <small class="mr-2"> {{ post.creator.createdAt }}</small>
    </div>
  </div>
  <img :src="post.imgUrl" class="img-fluid" />
  <div>
    <hr />
    <p class="text-justify">
      {{ post.body }}
    </p>
    <hr />

    <button
      v-if="account.id"
      @click="like(post.id)"
      class="btn btn-sm btn-primary mx-1"
    >
      {{ post.likes.length }}<i class="mdi text-danger mdi-heart-circle"></i>
    </button>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      posts: computed(() => AppState.posts),
      async like(id) {
        try {
          await postsService.like(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
hr {
  color: #a09c9c;
  margin: 1em;
}

.rounded-image {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
}

.name {
  font-weight: 600;
}

.fonts {
  position: absolute;
  right: 13px;
  top: 8px;
  color: #a09c9c;
}
</style>