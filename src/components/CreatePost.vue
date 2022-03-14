<template>
  <form @submit.prevent="createPost">
    <div>
      <label for="img" class="form-label">Create Post:</label>
      <textarea
        type="text"
        name="body"
        id="body"
        class="form-control m-1"
        placeholder="Enlighten us..."
        aria-describedby="helpId"
        v-model="state.editable.body"
      ></textarea>
    </div>
    <div class="d-inline">
      <label for="img" class="form-label">Add Image:</label>

      <input
        type="url"
        name="imgUrl"
        id="imgUrl"
        class="form-control d-inline"
        aria-describedby="helpId"
        placeholder="This had better be good..."
        v-model="state.editable.imgUrl"
      />

      <button class="btn btn-primary post-it">Post</button>
    </div>
  </form>
</template>

<script>
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { reactive } from "@vue/reactivity";

export default {
  setup() {
    const state = reactive({ editable: {} });
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.editable);
          state.editable = {};
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log("[CreatePost]", error.message);
        }
      },
    };
  },
};
</script>

<style>
.form-control {
  border-radius: 5px;
  margin-bottom: 1em;
}

.post-it {
  align-self: flex-end;
}
</style>