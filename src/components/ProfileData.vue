<template>
  <div class="col-md-12 px-0">
    <img :src="coverImg" class="my-2 cover-img" alt="..." />
    <div class="card-img-overlay d-flex">
      <div>
        <img :src="profile.picture" class="profile-img rounded" alt="" />
      </div>
      <div
        class="col-md-12 post elevation-3 m-2 d-flex justify-content-between"
      >
        <div>
          <h4 class="card-title">{{ profile.name }}</h4>
        </div>
        <div>
          <button class="btn btn-outline-warning rounded-pill">
            <i class="mdi mdi-pencil"></i>
          </button>
        </div>
      </div>
    </div>
    <div>
      <h6>{{ profile.email }}</h6>
      <p>{{ profile.bio }}</p>
      <h5>Github:</h5>
      <span>{{ profile.github }}</span>
      <h5>LinkedIn:</h5>
      <span>{{ profile.linkedin }}</span>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {
      profile: computed(() => AppSate.profile),
    };
  },
};
</script>


<style lang="scss" scoped>
.profile-img {
  height: 100px;
  width: 100px;
}
.cover-img {
  width: 100%;
  height: 19vh;
  object-fit: cover;
}

.post {
  background-color: rgb(255, 255, 255);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  padding: 2em;
  margin-top: 2em;
  border-radius: 15px;
}

.primary {
  color: rgb(63, 91, 153);
}

.hoverable {
  cursor: pointer;
}
</style>