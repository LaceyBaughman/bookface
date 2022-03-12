<template>
  <form @submit.prevent="createPost()">
    <div>
      <label for="img" class="form-label">Create Post:</label>
      <textarea
        type="text"
        name="body"
        id="body"
        class="form-control m-1"
        placeholder="Enlighten us..."
        aria-describedby="helpId"
        v-model="newPost.body"
      ></textarea>
    </div>
    <div class="for-the-love-of-god d-inline">
      <label for="img" class="form-label">Add Image:</label>

      <input
        type="url"
        name="imgUrl"
        id="imgUrl"
        class="form-control d-inline"
        aria-describedby="helpId"
        v-model="newPost.imgUrl"
      />

      <button class="btn btn-primary post-it">Post</button>
    </div>
  </form>
</template>

<script>
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props) {
    const newPost = ref({});
    const router = useRouter();
    watchEffect(() => {
      newPost.value = props.post;
    });
    return {
      newPost,
      async createPost() {
        try {
          await postsService.createPost(newPost.value);
          newPost = {};
          router.push({ name: "Home", params: { id: newPost.id } });
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