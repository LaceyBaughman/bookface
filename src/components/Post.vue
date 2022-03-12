<template>
  <div class="body d-flex justify-content-between p-2 px-3 body">
    <div class="body d-flex flex-row align-items-center">
      <img :src="post.creator.picture" class="rounded-circle" width="50" />
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

    <span>
      <h2><i class="mdi text-danger mdi-heart-circle"></i></h2
    ></span>
    <span class="ml-2">{{ post.likes.value }}</span>
  </div>
</template>


<script>
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