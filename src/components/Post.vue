<template>
  <div class="body d-flex justify-content-between p-2 px-3 body">
    <div
      class="body d-flex flex-row align-items-center justify-content-between"
    >
      <!-- <router-link: :to="{ name: 'Profile' }"> -->
      <img
        @click="goTo()"
        :src="post.creator.picture"
        class="rounded-image hoverable"
        width="50"
      />
      <!-- </router-link:> -->

      <div class="d-flex flex-column">
        <h4 class="name font-weight-bold mx-2">{{ post.creator.name }}</h4>
      </div>
      <span
        ><h2 v-if="account.id == post.creatorId">
          <i
            @click="deletePost(post.id)"
            class="mdi mdi-delete f-20 selectable"
          ></i></h2
      ></span>
    </div>
  </div>
  <img :src="post.imgUrl" class="img-fluid" />
  <div>
    <hr />
    <p class="text-justify">
      {{ post.body }}
    </p>
    <hr />
    <div class="post-footer justify-content-between">
      <h2 v-if="account.id" @click="like(post.id)">
        {{ post.likes.length }}<i class="mdi text-danger mdi-heart-circle"></i>
      </h2>

      <small> {{ timeStamp() }}</small>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRouter } from "vue-router";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      async goTo() {
        debugger;
        router.push({
          name: "Profile",
          params: { id: props.post.creator.id },
        });
      },
      async like(id) {
        try {
          await postsService.like(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      timeStamp() {
        const stamp = new Date(props.post.createdAt);
        return stamp;
      },
      async deletePost(id) {
        try {
          await postsService.deletePost(id);
        } catch (error) {
          console.error(error);
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

.post-footer {
  flex-direction: row;
}

.hoverable {
  cursor: pointer;
}
</style>