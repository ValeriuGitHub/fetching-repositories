<template>
  <div class="wrapper">
    <div class="section">
      <div class="title">Full name:</div>
      <div class="text">{{ repository.full_name }}</div>
    </div>

    <div class="section">
      <div class="title">Url:</div>
      <a :href="repository.html_url" target="_blank" class="link text">
        {{ repository?.url }}
      </a>
    </div>

    <div class="section">
      <div class="title">Stars:</div>
      <div class="text">{{ repository.stargazers_count }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Repository } from "~/types/repositories";

export default {
  props: {
    repository: {
      type: Object as PropType<Repository>,
      required: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}

.section {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.section:last-child {
  margin-bottom: 0px;
}

.title {
  margin-right: 5px;
  font-size: 18px;
  white-space: nowrap;
  font-weight: bold;
}

.link {
  transition: 0.3s ease-out;
  color: cornflowerblue;
}

.link:hover {
  color: deepskyblue;
}

@media (max-width: 550px) {
  .text,
  title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
