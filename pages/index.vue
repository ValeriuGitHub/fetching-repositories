<template>
  <div class="container">
    <h1>List of repositories</h1>
    <RepositoryList :users="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "~/types/users";

import RepositoryList from "~/components/RepositoryList.vue";

export default defineComponent({
  components: {
    RepositoryList,
  },

  async asyncData({ $axios }) {
    const usersResponse = await $axios.get("https://api.github.com/users");

    const users: User = usersResponse.data;

    return { users };
  },

  data() {
    return { users: [] as User[] };
  },
});
</script>
